const express = require('express');
const cors = require('cors');
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://lxsgynnf:qavuBKsGCqyUJo56TmQTL98Vk3rmsT3A@chunee.db.elephantsql.com/lxsgynnf',
  ssl: { rejectUnauthorized: false }
});

app.use(express.json());
app.use(cors()); 


app.post('/patients', async (req, res) => {
  try {
    const { name, surname, appointmentTime } = req.body;
    const query = 'INSERT INTO Patients (name, surname, appointmentTime) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, surname, appointmentTime];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


app.delete('/patients/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'DELETE FROM Patients WHERE patientID = $1';
    const result = await pool.query(query, [id]);
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


app.put('/patients/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, surname, appointmentTime } = req.body;
    const query = 'UPDATE Patients SET name = $1, surname = $2, appointmentTime = $3 WHERE patientID = $4';
    const values = [name, surname, appointmentTime, id];
    const result = await pool.query(query, values);
    res.json({ message: 'Patient updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(3500, () => {
  console.log('Server is running on port 3500');
});