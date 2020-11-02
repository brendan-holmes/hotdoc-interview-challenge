Connector Coding Challenge:
## Part 1: Brief
One part of HotDoc's offering to medical clinics, and a large part of our value to patients, is to facilitate online booking of appointments. We need to know when each practitioner is already booked in order to do this. The source of truth for this information is the clinic's 'Practice Management System' (PMS), a third party piece of software with which we integrate. Receptionists at the clinic will edit a doctor's appointment book in the PMS on behalf of patients who phone in at the same time as we're managing online appointments. The faster we can sync this information from the PMS to our servers, the less chance of a race condition between a phone and online appointment both trying to book the same appointment.

## Details
* An average clinic might have 8 doctors, but large clinics can have 30 - 40 that we would need to sync data for.
* The PMS often runs on an under-powered computer in the clinic's cupboard, and clinics often have internet connections that might drop in and out.
* We sync appointments for doctors 3 months in advance, and at most a doctor might have 10 appointments an hour for 8 hours a day.
* When an appointment is cancelled in the PMS by a receptionist it is hard-deleted, as in its record in the PMS' database disappears rather than updating a 'deleted_at' flag.
* We don't need to worry about syncing changes to an appointment: for the purposes of this exercise we can assume they are immutable other than when they are cancelled.
* A clinic's PMS can be assumed to not provide any official API interface for us to use, but we can access its underlying database. For the purposes of this exercise let's say the database is SQLite (in the real world it's usually MSSQL).
* A clinic's PMS database can have 20+ years of past data accumulated within it, so performance is an important consideration.
* An example schema for the Appointments table is provided in practice_management_system.db. You can view it with 'sqlite3 practice_management_system.db' then 'select * from appointments;' and '.schema appointments'.

## Task
Write a document proposing how to implement sync of appointments to HotDoc's servers, as if for discussion and review by your peers on the team. It should include discussion of possible pitfalls or risks, unknowns to resolve, and details of what is to be implemented (down to a level of granularity approximately equal to the commit messages you would expect to write).
  a. Spend no more than one hour on this.
  b. You are free to propose the interface that the HotDoc backend should present to your code, but you don't need go into detail on how that would be implemented.


## Part 2: Brief
When a patient makes an appointment, we need to enter it into the clinic's PMS so that the doctor knows to expect the patient. We need to be careful to avoid entering an appointment where one exists already, and we need to be conscious of distributed programming problems: for example we might create an appointment in the PMS, but might not be able to tell our backend that we created it successfully. If our process is restarted, we would then be in danger of attempting to create the appointment again and reporting failure due to there already being an appointment in the PMS (the one that we put there).

## Task:
Implement, in Node.js and SQL, code that retrieves an appointment from the HotDoc backend (you can define the interface, and implementing the backend is out of scope: stub out the backend interaction) and inserts it into the PMS' SQLite database.
  a. Spend no more than two hours on this.