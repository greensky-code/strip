
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

cus_token:{
    type:String
}

})

exports = mongoose.model('customer', customerSchema);