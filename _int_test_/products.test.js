const setupTestEnv = require('./setupTestEnv')

const app = setupTestEnv();

describe("Intgretation tests for CRUD operations connected to test postgres Db", () =>{
    test("Should create an product via POST route", async () =>{
        const product = {
            product: "Test product2",
            color: "Test color2",
            price: 22,
            status: true,
            gross_amount : 20
        }
        
        const response = await app.inject({
            method: "POST",
            url: "/v2",
            payload: product
        })

        expect(response.statusCode).toBe(201)
        expect(response.json()).toMatchObject([{product:"Test product2", color:"Test color2", price: 22, status: true, gross_amount:20, net_amount: 16.67, excluded_vat_amount:3.33}]) 
    })

    test("Should get all product via GET route", async () =>{
        
        const response = await app.inject({
            method: "GET",
            url: "/v2",
        })

        console.warn(response.json())

        expect(response.statusCode).toBe(200)
        expect(response.json()).toMatchObject([{product:"Test product", color:"Test color", price: 2, status: true, gross_amount:20, net_amount: 16.67, excluded_vat_amount:3.33}]) 
    })

    test("Should get one product via GET route", async () =>{
        
        const response = await app.inject({
            method: "GET",
            url: "/v2/1",

        })

        console.warn(response.json())

        expect(response.statusCode).toBe(200)
        
        expect(response.json()).toMatchObject({"color": "Test Color", "gross_amount": 20, "id": "1", "price": 2, "product": "Test Product", "status": true}) 
    })

    test("Should update an product via PUT route", async () =>{
        const product = {
            product: "Test product 2",
            color: "Test color 2",
            price: 35,
            status: true,
            gross_amount : 20
        }
        
        const response = await app.inject({
            method: "PUT",
            url: "/v2/1",
            payload: product
        })

        expect(response.statusCode).toBe(201)
        expect(response.json()).toMatchObject(product) 
    })

    test("Should delete a product via DELETE", async () => {

        const response = await app.inject({
          method: "DELETE",
          url: "/v2/1",
        });
    
        expect(response.statusCode).toBe(200);
        expect(response).toMatchObject({
          body: "Product 1 was deleted",
        });
    
      });
    
    
})

