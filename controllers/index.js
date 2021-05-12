const admin = require('firebase-admin'); 
const serviceAccount = require('../service.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    });
    const db = admin.firestore();
    // db.settings({ ignoreUndefinedProperties: true });

exports.sendData1 =  (req,res) => {
    const data = {
        companyName : req.body.nameOfCompany,
        totalEmployees : req.body.employeesNumber,
        email : req.body.email,
        contactNumber : req.body.contactNumber,
        date1 : req.body.date1,
        date2 : req.body.date2,
        date3 : req.body.date3,
        date : new Date().toISOString()
    }
   
  
    db.collection('21stcloud').doc('Partner-initiation-call')
            .set(data).then(() => {
                console.log("data added successfully")
            })
            .catch(err => {
                res.render('manageerrors');
            })
            .then(
                res.redirect('/payment1')
            )
            .catch((err) => {
                res.render('manageerrors')
            })
    

    
}

exports.sendData2 = (req, res) => {
    const data = {
        customerInformation : req.body.customerInformation,
        companyName : req.body.nameOfCompany,
        totalEmployees : req.body.employeesNumber,
        email : req.body.email,
        contactNumber : req.body.contactNumber,
        dataMigration : req.body.dataMigration,
        computeMigration : req.body.computeMigration,
        buisnessApplication : req.body.buisnessApplication,
        date : new Date().toISOString()
    }
   
  
    db.collection('21stcloud').doc('Deep-drive')
            .set(data).then(() => {
                console.log("data added successfully")
            })
            .then(
               res.redirect('/payment2')
            )
            .catch((err) => {console.log(err)})
    
}

