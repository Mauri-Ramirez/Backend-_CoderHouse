const { faker } = require("@faker-js/faker/locale/es")

//faker.locale = "en"

const generateProduct = () => {
    const thumbnails = []
    for(let i = 0; i< Math.floor(Math.random() * 6 + 1); i++){
        thumbnails.push(faker.image.url())
    }
    return{
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.product(),
        description: faker.commerce.productName(),
        code: faker.string.alphanumeric(8),
        price: faker.commerce.price(),
        stock: faker.number.int(300),
        category: faker.commerce.department(),
        status: faker.datatype.boolean(),
        thumbnails
    }
}

module.exports = generateProduct