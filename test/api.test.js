const  request = require("supertest") ;
const app = require("../server") 

describe("test routes", () => {
    test("Should have successful", async ()=>{
        const res = await request(app).get("/api/getBitcoinInfo/currency=USD")

        expect(res.body).toHaveProperty("success", 1);
        expect(res.body).toHaveProperty("current_rate");
        //expect statusCode to be 200
        expect(res.statusCode).toBe(200);
    })

    test("Should have successful", async ()=>{
        const res = await request(app).get("/api/getBitcoinInfo/currency=bdt")

        expect(res.body).toHaveProperty("success", 1);
        expect(res.body).toHaveProperty("current_rate");
        //expect statusCode to be 200
        expect(res.statusCode).toBe(200);
    })

    test("Should have successful", async ()=>{
        const res = await request(app).get("/api/getBitcoinInfo/currency=inr")

        expect(res.body).toHaveProperty("success", 1);
        expect(res.body).toHaveProperty("current_rate");
        //expect statusCode to be 200
        expect(res.statusCode).toBe(200);
    })

    test("Should have failed", async ()=>{
        const res = await request(app).get("/api/getBitcoinInfo/currency=xyz")

        expect(res.body).toHaveProperty("success", 0);
        expect(res.body).toHaveProperty("message");
        //expect statusCode to be 200
        expect(res.statusCode).toBe(404);
    })

    test("Should have failed", async ()=>{
        const res = await request(app).get("/api/getBitcoinInfo/currency=djs")

        expect(res.body).toHaveProperty("success", 0);
        expect(res.body).toHaveProperty("message");
        //expect statusCode to be 200
        expect(res.statusCode).toBe(404);
    })
})