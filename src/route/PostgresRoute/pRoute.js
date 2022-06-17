const client = require("pg/lib/native/client")

const getAll = require('../../schemas/getAll')
const getOne = require('../../schemas/getOne')
const postOne = require('../../schemas/postOne')
const deleteOne = require('../../schemas/deleteOne')
const UpdateOne = require('../../schemas/updateOne')
const vatCalculator = require('../../utlis/vatCalculator')

const PostgresProductsRoute = (fastify, options, done) => {

    fastify.post('/',postOne, async (request, reply) => {
        
        try {
            const {product, color, price, status, gross_amount} = request.body

            const netAmound = vatCalculator.calculateNetAmound(gross_amount)
            const vatAmount = vatCalculator.calculateVAT(netAmound)

            const { rows } = await fastify.pg.query(
            "INSERT INTO products (product, color, price, status, gross_amount, net_amount, excluded_vat_amount ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * ",
             [product, color, price, status, gross_amount, netAmound, vatAmount],)
            reply.code(201).send(rows[0])
        } catch(err) {
          reply.send(err)
        }finally{
            client.release();
        }
      })

      fastify.get('/',getAll, async (request, reply) => {
        try {
            const { rows } = await fastify.pg.query(
            "SELECT * FROM products")
            reply.send(rows)
        } catch(err) {
          reply.send(err)
        }
      })

      fastify.get('/:id',getOne, async (request, reply) => {
        try {
            const {id} = request.params
            const { rows } = await fastify.pg.query(
            "SELECT * FROM products WHERE id=$1", [id])
            reply.send(rows[0])
        } catch(err) {
          reply.send(err)
        }
      })


      fastify.delete('/:id',deleteOne, async (request, reply) => {
        try {
            const {id} = request.params
            const { rows } = await fastify.pg.query(
            "DELETE FROM products WHERE id=$1", [id])
            reply.send(`Product ${id} was deleted`)
        } catch(err) {
          reply.send(err)
        }
      })


      fastify.put('/:id',UpdateOne, async (request, reply) => {
        try {
            const {id} = request.params
            const {product, color, price, status} = request.body
            const { rows } = await fastify.pg.query(
            "UPDATE products SET product=$1, color=$2, price=$3 , status=$4 WHERE id=$5 RETURNING *", [product, color, price, status, id])
            reply.send(rows[0])
        } catch(err) {
          reply.send(err)
        }
      })




      done ();
      
}


module.exports = {PostgresProductsRoute}