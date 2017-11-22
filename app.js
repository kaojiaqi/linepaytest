const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

axios.defaults.headers.post['Content-Type'] = "application/json"
axios.defaults.headers.post['x-api-key'] = "72DMgo9RQN2BSW4SmaHWYVOUCEIUDMg9i1JnXKic"


app.use('/',express.static(__dirname + "/public/views"))

app.post('/create_order', (req, res, next) => {
    console.log(req.body)
    axios.post(`https://dev-prod.tappayapis.com/tpc/payment/pay-by-prime`, {
        prime: req.body.prime,
        partner_key: "72DMgo9RQN2BSW4SmaHWYVOUCEIUDMg9i1JnXKic",
        fraud_id: req.body.fraud_id,
        merchant_id: "LINE.TEST", 
        amount: 1,
        details: "Some details about item",
        currency: "TWD",
        order_number: 'AB12385128', // e.g AB12385128
        cardholder: {
            "phone_number": "+886923456789",
            "name": "王小明",
            "email": "LittleMing@Wang.com",
            "zip_code": "100",
            "address": "台北市天龍區芝麻街1號1樓",
            "national_id": "A123456789"
        },
        result_url: {
            frontend_redirect_url: `https://linepaytest.herokuapp.com/confirm_order`,
            backend_notify_url: `https://linepaytest.herokuapp.com/backend_notify_url`,
        }
    }).then((result) => {
        // 錯誤的話，回傳錯誤訊息
        if (result.data.status !== 0) {
            console.log(result.data);
            return res.json({
                status: result.data.status,
                msg: result.data.msg
            })
        }
        // 正確的話，回傳 payment url 給客戶去進行付款
        res.json(console.log('success'),{
            payment_url: result.data.payment_url,
            status: result.data.status,
            msg: result.data.msg
        })
    }).catch((error) => {
        console.log(error);
        return res.json({
            message: error.message,
            stack: error.stack
        })
    })
})


app.post('backend_notify_url',(req,res) => {
    console.log(req.body)

    res.json()
})


app.listen(process.env.PORT || 3000);