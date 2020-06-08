const mongoose = require("mongoose");
const config = require("config");
const mongoUri = config.get("mongoUri");
const ora = require('ora');

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

const db = mongoose.connect(mongoUri, options , err => {
    if(err) throw err;
});

//import model
const Customer = require("./models/customer");

//Add customer
const addCustomer = async customer => {
    try{
        const throbber = ora("Customer creation in progress...").start();
        const newCust = await Customer.create(customer);
        throbber.stop();
        console.info("Customer added!");
        mongoose.connection.close()
    }
    catch(err){
     console.error(err)
    };
}

//Find a customer
const findCustomer = name => {
    const search = new RegExp(name, "i");
    Customer.find({
    $or: [{ firstname: search }, 
          { lastname: search }]    
    }).then(customer => {
        console.info(customer);
        console.info(`${customer.length} matches`);
        mongoose.connection.close()
    }).catch(err => console.error(err))
}

//update a customer
const updateCustomer = (_id, customer) => {
    Customer.updateOne({_id}, customer)
            .then(customer => {
                // console.info(customer);
                console.info("Customer updated")
                mongoose.connection.close()
            }).catch(err => console.error(err))
}

//delete a customer
const deleteCustomer = (_id) => {
    Customer.deleteOne({_id})
            .then(customer => {
                // console.info(customer);
                console.info("Customer removed")
                mongoose.connection.close()
            }).catch(err => console.error(err))
}

//list all customers
const listCustomers = () => {
    Customer.find()
            .then(customers => {
                console.info(customers);
                console.info(`${customers.length} customers`);
                mongoose.connection.close()
            }).catch(err => console.error(err))
}

module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    deleteCustomer,
    listCustomers
};