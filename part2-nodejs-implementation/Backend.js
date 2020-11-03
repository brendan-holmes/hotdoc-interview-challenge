 class Backend {
    getAppointment(){
        const appointment = {
            id: null,
            start_time: '2020-08-07 10:40:00',
            duration: 15,
            practitioner_id: 2,
            patient_id: 15,
            appointment_type_id: 8
        }
        return appointment;
    }
}

module.exports.Backend = Backend;