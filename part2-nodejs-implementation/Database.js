var sqlite3 = require('sqlite3').verbose();

class Database {
    constructor(location) {
        this.db = this.init(location);
    }

    init(location) {
        return new sqlite3.Database(location, (err) => {
            if (err) {
                return console.error(err.message);
            }
          });
    }

    printAllAppointments() {
        console.log(`id\tstart_time\tduration\tpractitioner_id\tpatient_id\tappointment_type_id\t`);
        this.db.each("select * from appointments", function(err, row) {
            console.log(`${row.id}\t${row.start_time}\t${row.duration}\t${row.practitioner_id}\t${row.patient_id}\t${row.appointment_type_id}\t`);
        });
    }

    insertAppointment(appointment) {
        var appointmentData = [];
        for(var i in appointment){
            appointmentData.push(appointment [i]);
        };
        if (appointmentData.length !== 6) {
            return console.log(`Appointment has invalid data format. Expected appointment to have 6 elements. Appointment: ${appointmentData}`)
        }
    
        this.db.run("INSERT INTO appointments VALUES(?,?,?,?,?,?)", appointmentData, (err) => {
            if (err) {
                return console.error(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted. `);
          });
    }

    close() {
        this.db.close();
    }
}

module.exports.Database =  Database;