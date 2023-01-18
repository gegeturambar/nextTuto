const fs = require('fs');

let cars = require('data/cars.json');

export const carsRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll() {
    return cars;
}

function getById(id) {
    return cars.find(x => x.id.toString() === id.toString());
}

function create({ title, firstName, lastName, email, role, password }) {
    const car = { title, firstName, lastName, email, role, password };

    // validate
    if (cars.find(x => x.email === car.email))
        throw `Car with the email ${car.email} already exists`;

    // generate new car id
    car.id = cars.length ? Math.max(...cars.map(x => x.id)) + 1 : 1;

    // set date created and updated
    car.dateCreated = new Date().toISOString();
    car.dateUpdated = new Date().toISOString();

    // add and save car
    cars.push(car);
    saveData();
}

function update(id, { title, firstName, lastName, email, role, password }) {
    const params = { title, firstName, lastName, email, role, password };
    const car = cars.find(x => x.id.toString() === id.toString());

    // validate
    if (params.email !== car.email && cars.find(x => x.email === params.email))
        throw `Car with the email ${params.email} already exists`;

    // only update password if entered
    if (!params.password) {
        delete params.password;
    }

    // set date updated
    car.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(car, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted car and save
    cars = cars.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

// private helper functions

function saveData() {
    fs.writeFileSync('data/cars.json', JSON.stringify(cars, null, 4));
}