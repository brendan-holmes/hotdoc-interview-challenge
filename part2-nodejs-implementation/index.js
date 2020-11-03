const { Backend } = require('./Backend.js');
const { Database } = require('./Database.js')

const db = new Database('./practice_management_system.db');
const backend = new Backend();

db.printAllAppointments();
db.insertAppointment(backend.getAppointment());
db.printAllAppointments();
db.close();