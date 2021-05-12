// var paypal = require('paypal-rest-sdk');




// paypal.configure({
//     'mode': 'live', //sandbox or live
//     'client_id': 'AbYW6ovTItCsuohzHYh9cXoSHPxb2s40ai85pMGzGnUEoInKijKzP814yKZNAoekyw00rculcF6cShkr',
//     'client_secret': 'EGjt4hSmdY2JGag40Vad1fkhlYM0JHbDATUaULvemOXdpby6I1n650fEJH7GHoYDz_-q8OKX2tTTlzvl'
//   });


//   exports.payment1((req, res) => {
//     var newPayment = {
//         "intent": "sale",
//         "payer": {
//             "payment_method": "paypal"
//         },
//         "redirect_urls": {
//             "return_url": "http://return.url",
//             "cancel_url": "http://cancel.url"
//         },
//         "transactions": [{
//             "item_list": {
//                 "items": [{
//                     "name": "partnership-initiation call",
//                     "price": "0.1",
//                     "currency": "USD",
//                     "quantity": 1
//                 }]
//             },
//             "amount": {
//                 "currency": "USD",
//                 "total": "0.1"
//             },
//             "description": "Thanks for payment"
//         }]
//     };
    
//     var payment = await paypal.payment.create(newPayment);
      
//   })

  