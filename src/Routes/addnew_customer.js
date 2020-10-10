var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var stripe = require('stripe')('sk_test_51HaE0kLTAKjofwlPktX1hhR197MW5h5zSjVndRpnZXeF9gMtejPVoD2mm4SyNMc1xf7g9tRxKSaWX7Xi7KbzwUAc00Czmk7Ub9');


//  get all data base modal

require('../models/customer');
const customer_create = mongoose.model('customer');


var customer = function () {
    var param = {}
}



router.post('/addnewcoutomer', async function (req, res) {
    var param = {}
        param.email = req.body.email,
        param.name = req.body.name,
        param.description = req.body.description
    // create customer id 
    stripe.customers.create(param,  function (err, customer) {
        if (err) {
            console.log("err" + " :" + err)
        }
        if (customer) {
            console.log("success : " + JSON.stringify(customer))
            req.body.cus_id = customer.id
            // create customer token id
            var param = {}
            param.card={
                number : req.body.number,
                exp_month: req.body.exp_month,
                exp_year : req.body.exp_year,
                cvc : req.body.cvc
            }
            stripe.tokens.create(param, function (err, token) {
                if (err) {
                    console.log("err" + " :" + err)
                }
                if (token) {
                    console.log("success : " + JSON.stringify(token))
                    req.body.token_id = token.id
                    // this function work to update user base card data
                    stripe.customers.createSource(req.body.cus_id, req.body.token_id, async function (err, card) {
                        if (err) {
                            console.log("err" + " :" + err)
                        }
                        if (!card) {
                            console.log("success : " + JSON.stringify(card))
                            req.body.token_id = token.id
                             let customers_data = new  customer_create(req.body)
                             let result = await customers_data.save()
                             if(result){
                                 res.send({value : result, status:200})
                             }
                        }
                    })

                }
            })
        }
    })
})

router.post('/getuserdata', async function (req, res) {
    stripe.customers.retrieve(req.body.id, function (err, customer) {
        if (err) {
            console.log("err : " + err)
        }
        if (customer) {
            console.log("success : " + JSON.stringify(customer))
            res.send({ data: customer })
        } else {
            console.log("somethings wrong")
        }
    })
})




router.get('/getalldata', async function (req, res) {
    let result = await customer_create.find()
    if (result) {
        res.send({ status: 200, value: result })
    }
})

module.exports = router