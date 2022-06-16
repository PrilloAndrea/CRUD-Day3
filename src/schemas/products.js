

const products = {
    type: 'object',
    properties: {
        id: {type: 'string'},
        product: {type: 'string'},
        color: {type: 'string'},
        price: {type: 'integer'},
        status: {type: 'boolean'},
        gross_amount: {type: 'number'}
      },
  } 


  module.exports = products