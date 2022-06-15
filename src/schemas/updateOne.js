const products = require('./products')
const UpdateOne = {
    schema: {
        body: {
            type: "object",
            properties: {
                product: {type: 'string'},
                color: {type: 'string'},
                price: {type: 'integer'},
                status: {type: 'boolean'}
              },

        },
        response: {
            201: products
        },
    }
  }

  module.exports = UpdateOne