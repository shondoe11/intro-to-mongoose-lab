const prompt = require('prompt-sync')();
const mongoose = require('mongoose');
require('dotenv').config();
const Customer = require('./Customers');

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  mongoose.set('debug', true);
  console.log('Connected to MongoDB');
};

const mainMenu = async () => {
    while (true) {
        console.log('Welcome to the CRM');
        console.log('1. Create a customer');
        console.log('2. View all customers');
        console.log('3. Update a customer');
        console.log('4. Delete a customer');
        console.log('5. Quit');

        const choice = prompt('Number code to run action: ');

        if (choice === '1') {
            await createCustomer();
        } else if (choice === '2') {
            await viewCustomers();
        } else if (choice === '3') {
            await updateCustomer();
        } else if (choice === '4') {
            await deleteCustomer();
        } else if (choice === '5') {
            break;
        } else {
            console.log('Invalid choice, please try again.');
        }
    };
    console.log('Exiting...');
    mongoose.connection.close();
};

const createCustomer = async () => {
    const name = prompt('Enter customer name: ');
    const age = prompt('Enter customer age: ');
    const customer = new Customer ({name,age});
    await customer.save();
    console.log('Customer created')
};

const viewCustomers = async () => {
    const customers = await Customer.find();
    console.log('Customer List: ');
    customers.forEach(c => { console.log(`id: ${c._id} -- Name: ${c.name}, Age: ${c.age}`);
    });
};

const updateCustomer = async () => {
    await viewCustomers();
    const id = prompt('Enter the customer ID to update: ');
    const customer = await Customer.findById(id);
    if (!customer) {
        console.log('Customer not found.');
        return;
    };
    const name = prompt('Enter new name ');
    const age = prompt('Enter new age ');

    await Customer.findByIdAndUpdate(id, {name,age});
    console.log('Customer updated');
};

const deleteCustomer = async () => {
    await viewCustomers();
    const id = prompt('Enter customer ID to delete: ');
    const customer = await Customer.findById(id);
    if (!customer) {
        console.log('Customer not found.');
        return;
    };
    await Customer.findByIdAndDelete(id);
    console.log('Customer deleted');
}

mainMenu();
connect();