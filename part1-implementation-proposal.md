# Part 1: Implementation Proposal

Written by Brendan Holmes, 3 November 2020

## TL;DR

We want to sync HotDoc's servers with each clinic's own server.

## Considerations

- Sync latency should be minimised
- Connectivity with clinic server is not guaranteed
- Appointments are never updated
- Deleted appointments are removed from the database
- We have access to the clinic's database
- Clinic's databases can be very large
- Clinic's database can run on slow hardware

## Pitfalls/risks

- HotDoc's server fails or becomes unavailable temporarily
- HotDoc's server is entirely corrupted
- Clinic's server is unavailable temporarily due to network connectivity issues
- Two people book the same appointment using HotDoc's online booking and with clinic directly at the same time
- HotDoc user starts booking an appointment, but the appointment becomes unavailable before user successfully books it

## Unkowns to resolve

## Details of what is to be implemented

The HotDoc server should ideally be an exact copy of the clinic's server, and should be able to relay this information to the HotDoc backend.

There are three main functional components:

1. Syncronisation with the clinic server.
2. Responding to the HotDoc backend's requests.
3. Logic for handling when there is a discrepancy or logistical problem between the two servers.

### Syncronisation with the clinic server

The HotDoc server should monitor/observe the clinic server for changes.

Implement an event system that monitors the database for changes and subscribe to events. Connectivity should also raise an event and notify the HotDoc backend via the interface.

When an event occurs, the HotDoc server should notify the HotDoc backend if, for example, the user is in the middle of booking an appointment, but we don't want to wait until the user tries to book and is denied before updating the UI.

### Responding to the HotDoc backend's requests

The HotDoc server should make the relevant changes to the clinic server in response to requests from the backend. All backend requests may not succeed and the response should carry error messages if required.

#### HotDoc backend interface

- Request connection status of clinic's server
- Receive a connection status update
- Request all available appointments (backend can filter by time/day/doctor etc)
- Receive an availability update
- Request availability of a single appointment
- Book an appointment
- Delete appointment

### Logic for handling when there is a discrepancy or logistical problem between the two servers

1. A discrepancy might occur if the HotDoc server process fails for any period of time.
2. A logistical problem might occur if the clinic server goes offline.

#### HotDoc server process fails

It must be assumed that in this case, there might be a discrepancy between the two servers as bookings might have been made in the interim. Of less importance would be that if past appointments have been deleted. For this exercise, we will assume that we only care about future appointments.

To re-align the two servers, the HotDoc server should first notify the HotDoc backend that there may be a conflict, and then do a syncronisation of all appointments in the future.

#### Clinic server goes offline

If the clinic server goes offline, we assume that there is no internet connectivity, but the clinic receptionist can still take bookings. Since we have no way of knowing which bookings might have been made, we must hold off on any new bookings from the HotDoc side. This information should be relayed to the HotDoc backend.

When the clinic server becomes available again, we must do a complete syncronisation of future bookings as in the above case where the HotDoc server process fails.

### Tasks

- Implement database operations according to the backend interface (e.g. Create, Read, Delete and connectivity status check)
- Implement clinic server notifications and events for synchronisation
- Implement handling of discrepancies for case where either HotDoc server process or clinic server connectivity fails for any period of time
