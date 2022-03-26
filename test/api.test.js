const  request = require("supertest") ;
const app = require("../server") 

describe("test routes", () => {

    test("Should have successful (USD)", async ()=>{
        const res = await request(app).get("/api/getBitcoinInfo/currency=USD")

        expect(res.body).toHaveProperty("success", 1);
        expect(res.body).toHaveProperty("current_rate");
        expect(res.statusCode).toBe(200);
    })

    test("Should have successful (BDT)", async ()=>{
        const res = await request(app).get("/api/getBitcoinInfo/currency=bdt")

        expect(res.body).toHaveProperty("success", 1);
        expect(res.body).toHaveProperty("current_rate");
        expect(res.statusCode).toBe(200);
    })

    test("Should have successful (INR)", async ()=>{
        const res = await request(app).get("/api/getBitcoinInfo/currency=inr")

        expect(res.body).toHaveProperty("success", 1);
        expect(res.body).toHaveProperty("current_rate");
        expect(res.statusCode).toBe(200);
    })

    test("Should have failed", async ()=>{
        const res = await request(app).get("/api/getBitcoinInfo/currency=xyz")

        expect(res.body).toHaveProperty("success", 0);
        expect(res.body).toHaveProperty("message");
        expect(res.statusCode).toBe(404);
    })

    test("Should have failed", async ()=>{
        const res = await request(app).get("/api/getBitcoinInfo/currency=djs")

        expect(res.body).toHaveProperty("success", 0);
        expect(res.body).toHaveProperty("message");
        expect(res.statusCode).toBe(404);
    })
})