const vatCalculator = require('../src/utlis/vatCalculator')

describe("Vat calculator", ()=>{

    test("Should return the correct VAT excluded amount for 20% VAT", () =>{
        const result = vatCalculator.calculateVAT(16.67)
        expect(result).toBe(3.33)
    })

    test("Should return the correct gross amount for 20% VAT", () =>{
        const result = vatCalculator.calculateGrossAmound(16.67)
        expect(result).toBe(20)
    })

    test("Should return the correct net amount for 20% VAT", () =>{
        const result = vatCalculator.calculateNetAmound(20)
        expect(result).toBe(16.67)
    })
})