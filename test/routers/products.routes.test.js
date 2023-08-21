const { expect, should } = require("chai")
const supertest = require("supertest")
const productModel = require("../../src/dao/models/product.model.js")
const userModel = require("../../src/dao/models/user.model.js")

const requester = supertest("http://localhost:8080")

describe("Products routes testing for unauthenticated users", async() =>{

    it("[POST] /api/products - Should return a code 401 for unauthenticated users", async()=>{
        const mockProduct = {
            title: "Mock xbox",
            description: "mock game",
            code: "mockxbox",
            price: 666,
            stock: 5,
            category: "testing",
            status: "true",
            thumbnails: [],
            owner: "admin"
        }

        const response = await requester.post("/api/products").send(mockProduct)
        expect(response.statusCode).to.be.eql(401)
    })
})

describe("Products routes testing for user with USER role", async() =>{
    let cookie

    it("[POST] /api/session/register - Should register a user and redirect", async function(){
        const mockUser = {
            firstName: "Mockmauri3",
            lastName: "Mockramirez3",
            age: 29,
            email: "mockmr3@gmail.com",
            password: "pass1234"
        }
        const response = await requester.post("/api/session/register").send(mockUser)
        expect(response.statusCode).to.be.eql(302)
        expect(response.request._data.email).to.be.eql(mockUser.email)
    })

    it("[POST] /api/session/login - Should login an user", async() => {
        const mockCredentials = {
            email: "mockmr3@gmail.com",
            password: "pass1234"
        }
        const response = await requester.post("/api/session/login").send(mockCredentials)
        const cookieHeader = response.headers["set-cookie"][0]
        cookie = {
            name: cookieHeader.split("=")[0],
            value: cookieHeader.split("=")[1]
        }
        expect(response.statusCode).to.be.eql(302)
        expect(cookieHeader).to.be.ok
        expect(cookie.name).to.be.eql("mysession")
        expect(cookie.value).to.be.ok
    })

    it("[GET] /api/session/current - Should return current logged user with USER role", async() =>{
        const response = await requester.get("/api/session/current")
            .set("Cookie", [`${cookie.name}=${cookie.value}`])
        expect(response.statusCode).to.be.eql(200)
        expect(response.body.payload.email).to.be.eql("mockmr3@gmail.com")
        expect(response.body.payload.role).to.be.eql("user")    
    })

    it("[POST] /api/products - Should return a 403 status", async() =>{
        const mockProduct = {
            title: "Mock xbox",
            description: "mock game",
            code: "mockxbox",
            price: 666,
            stock: 5,
            category: "testing",
            status: "true",
            thumbnails: []           
        }
        const response = await requester.post("/api/products").send(mockProduct)
            .set("Cookie", [`${cookie.name}=${cookie.value}`])
        expect(response.statusCode).to.be.eql(403)    
    })
    after(async() =>{
        await userModel.findOneAndDelete({email: "mockmr3@gmail.com"})
    })
})

describe("Products routes testing for user with PREMIUM role", async() =>{
    let cookie

    it("[POST] /api/session/register - Should register a user and redirect", async function(){
        const mockUser = {
            firstName: "premium",
            lastName: "premium",
            age: 29,
            email: "premium@gmail.com",
            password: "123"
        }
        const response = await requester.post("/api/session/register").send(mockUser)
        expect(response.statusCode).to.be.eql(302)
        expect(response.request._data.email).to.be.eql(mockUser.email)
    })

   it("[POST] /api/users/premium/:uid - Should change user role to premium", async()=>{
        const user = await userModel.findOne({email: "premium@gmail.com"}).lean()
        const userId = user._id.toString()
        const response = await requester.put(`/api/users/premium/${userId}`)
        expect(response.statusCode).to.be.eql(200)
    })
 
    it("[POST] /api/session/login - Should login an user", async()=>{
        const mockCredentials = {
            email: "premium@gmail.com",
            password: "123"
        }
        const response = await requester.post("/api/session/login").send(mockCredentials)
        const cookieHeader = response.headers["set-cookie"][0]
        cookie = {
            name: cookieHeader.split("=")[0],
            value: cookieHeader.split("=")[1]
        }
        expect(response.statusCode).to.be.eql(302)
        expect(cookieHeader).to.be.ok
        expect(cookie.name).to.be.eql("mysession")
        expect(cookie.value).to.be.ok
    })

    it("[GET] /api/session/current - Should return current logged user with PREMIUM role", async() =>{
        const response = await requester.get("/api/session/current")
            .set("Cookie", [`${cookie.name}=${cookie.value}`])
        expect(response.statusCode).to.be.eql(200)
        expect(response.body.payload.email).to.be.eql("premium@gmail.com")
        expect(response.body.payload.role).to.be.eql("premium")
    })

    it("[POST] /api/products - Should create a new product", async() =>{
        const mockProduct = {
            title: "Mock xbox",
            description: "mock game",
            code: "mockxbox",
            price: 666,
            stock: 5,
            category: "testing",
            status: "true",
            thumbnails: []
        }
        const response = await requester.post("/api/products").send(mockProduct)
            .set("Cookie", [`${cookie.name}=${cookie.value}`])
        expect(response.statusCode).to.be.eql(201)
    })

    it("[DELETE] /api/products/:pid - Should delete a product", async()=>{
        const product = await productModel.findOne({code: "mockxbox"}).lean()
        const productId = product._id.toString()
        const response = await requester.delete(`/api/products/${productId}`)
            .set("Cookie", [`${cookie.name}=${cookie.value}`])
        const deleteProduct = await productModel.findOne({code: "mockxbox"}).lean()
        expect(response.statusCode).to.be.eql(200)
        expect(deleteProduct).to.be.eql(null)
    })

    after(async() =>{
        await userModel.findOneAndDelete({ email: "premium@gmail.com"})
        await productModel.findOneAndDelete({ code: "mockxbox"})
    })


})
