
var mongoose = require('mongoose');

var customerSchema = mongoose.Schema({

    email: {
        type: String
    },

    address: {
        type: String
    },

    name: {
        type: String
    },
currency: {
        type: String
    },
    cus_id:{
    type:String
},

token_id:{
    type:String
},

charge_id:{
    type:String
}

})

exports = mongoose.model('customer', customerSchema);