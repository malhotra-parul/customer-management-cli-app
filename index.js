const mongoose = require("mongoose");
const config = require("config");
const mongoUri = config.get("mongoUri");

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

const db = mongoose.connect(mongoUri, options , err => {
    if(err) throw err;
    console.log("DB connected!");
});

//import model
const Customer = require("./models/customer");

//Add customer
const addCustomer = customer => {
    Customer.create(customer).then(customer => {
        console.info("Customer added!");
        db.close();
    });
}

//Find a customer
const findCustomer = name => {
    const search = new RegExp(name, "i");
    Customer.find({
    $or: [{ firstName: search }, 
          { lastName: search }]    
    }).then(customer => {
        console.info(customer);
        console.info(`${customer.length} matches`);
    })
}

module.exports = {
    addCustomer,
    findCustomer
};