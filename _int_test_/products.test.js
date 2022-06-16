const setupTestEnv = require('./setupTestEnv')

const app = setupTestEnv();

describe("Intgretation tests for CRUD operations connected to test postgres Db", () =>{
    test("Should create an product via POST route", async () =>{
        const product = {
            product: "Test product 2",
            color: "Test color 2",
            price: 35,
            status: true,
            gross_amount : 20
        }
        
        const response = await app.inject({
            method: "POST",
            url: "/v2",
            payload: product
        })

        expect(response.statusCode).toBe(201)
        expect(response.json()).toMatchObject(product) 
    })
})