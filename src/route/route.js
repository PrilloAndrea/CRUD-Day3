const getAll = require('../schemas/getAll')
const getOne = require('../schemas/getOne')
const postOne = require('../schemas/postOne')
const deleteOne = require('../schemas/deleteOne')
const UpdateOne = require('../schemas/updateOne')
let Products = require('../Products')

const productsRoute=(fastify, options, done) => {


    fastify.get('/',getAll, function(request, reply){
        const products = Products
        reply.send(products)
    })

    fastify.get('/:id',getOne, function(request, reply){
        const {id} = request.params
        const products = Products.find((item)=> item.id === id )        
        reply.send(products)
    })

    fastify.post('/',postOne, function(request, reply){
        const {product ,color, price, status} = request.body
        const products = {id: String(Products.length +1), product, color, price, status}  
        Products.push(products)
        reply.code(201).send(products)
    })

    fastify.delete('/:id',deleteOne,function(request, reply){
        const {id} = request.params
        Products = Products.filter((item)=> item.id !== id)
        reply.send(`Product ${id} got deleted`)

    })

    fastify.put('/:id',UpdateOne, function(request, reply){
        const {id} = request.params
        const {product ,color, price, status}= request.body
        const products = Products.find((products)=> products.id === id )
        products.product = product
        products.color = color
        products.price = price
        products.status = status
        
        reply.send(products)
    })
    

    done()
}

module.exports = {productsRoute}