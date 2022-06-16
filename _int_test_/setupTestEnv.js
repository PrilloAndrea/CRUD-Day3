const {build} = require('../src/app')


const createTableSQL = "CREATE TABLE products (id SERIAL, product text, color text, price integer, status boolean, gross_amount numeric, net_amount numeric, excluded_vat_amount numeric, PRIMARY KEY(id))";
const clearTableSQL = "DELETE FROM products";
const insertFakeProductSQL = "INSERT INTO products (product, color, price, status, gross_amount, net_amount, excluded_vat_amount ) VALUES ($1, $2, $3, $4, $5, $6, $7)";

module.exports = function setupTestEnv(){
    const app = build({logger: true}, {}, {connectionString: 'postgres://postgres:postgres@localhost:5432/postgres_test'})

    beforeAll(async () =>{
        await app.ready()
        await app.pg.query(createTableSQL)
        await app.pg.query(clearTableSQL)
    })

    beforeEach(async () =>{
        await app.pg.query(insertFakeProductSQL, ["TestProduct", "TestColor", 2, true, 20, 16.67, 3.33]);
    })

    afterEach(async () =>{
        await app.pg.query(clearTableSQL)
    })

    afterAll(async () =>{
        app.close()
    } )

    return app

}