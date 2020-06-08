#!/usr/bin/env node
const program = require("commander");
const { prompt } = require("inquirer");
const { 
    addCustomer, 
    findCustomer,
    updateCustomer,
    deleteCustomer,
    listCustomers
 } = require("./index");


//customer questions in an array of object
const questions = [
    {
        type: "input",
        name: "firstname",
        message: "Enter customer's first name"
    },
    {
        type: "input",
        name: "lastname",
        message: "Enter customer's last name"
    },
    {
        type: "input",
        name: "phone",
        message: "Enter customer's phone number"
    },
    {
        type: "input",
        name: "email",
        message: "Enter customer's email address"
    }
]

program
    .version("1.0.0")
    .description("Customer Management CLI tool")

//Using only commander.js
// program
//     .command("add <firstname> <lastname> <phone> <email>")
//     .alias("a")
//     .description("Add a customer")
//     .action((firstname, lastname, phone, email)=>{
//         addCustomer({firstname, lastname, phone, email});
//     }) 

//using inquirer along with commander.js

//add customer
program
    .command("add")
    .alias("a")
    .description("Add a customer")
    .action(()=> {
        prompt(questions).then(answers => addCustomer(answers));
    })

//find customer
program
    .command("find <name>")
    .alias("f")
    .description("Find a customer by name")
    .action(name=>{
        findCustomer(name);
    })

//update customer
program
    .command("update <_id>")
    .alias("u")
    .description("Update a customer")
    .action((_id)=> {
        prompt(questions).then(answers => updateCustomer(_id, answers));
    })

//remove customer
program
    .command("delete <_id>")
    .alias("d")
    .description("Delete a customer")
    .action(_id => deleteCustomer(_id));

//list all customers
program
    .command("list")
    .alias("l")
    .description("List all customers")
    .action(()=> listCustomers());

program.parse(process.argv);