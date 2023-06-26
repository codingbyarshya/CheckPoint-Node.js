import React, { useState } from 'react';
import axios from 'axios';

const PatientsForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [patientID, setPatientID] = useState('');

  const handleAddPatient = () => {
    axios.post('http://localhost:4000/patients', { name, surname, appointmentTime })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeletePatient = () => {
    axios.delete(`http://localhost:4000/patients/${patientID}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleUpdatePatient = () => {
    axios.put(`http://localhost:4000/patients/${patientID}`, { name, surname, appointmentTime })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="text" placeholder="Surname" value={surname} onChange={e => setSurname(e.target.value)} />
      <input type="text" placeholder="Appointment Time" value={appointmentTime} onChange={e => setAppointmentTime(e.target.value)} />
      <input type="text" placeholder="Patient ID" value={patientID} onChange={e => setPatientID(e.target.value)} />
      <button onClick={handleAddPatient}>Add</button>
      <button onClick={handleDeletePatient}>Delete</button>
      <button onClick={handleUpdatePatient}>Update</button>
    </div>
  );
};

export default PatientsForm;