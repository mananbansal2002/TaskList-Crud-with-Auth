require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const db = require('./db');

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET;
const DJANGO_URL = process.env.DJANGO_URL;
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Username and password required' });

  const existing = await db('users').where({ username }).first();
  if (existing) return res.status(400).json({ error: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db('users').insert({ username, password: hashedPassword });
    res.json({ message: 'User registered' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Username and password required' });

  const user = await db('users').where({ username }).first();
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Fetch tasks from Django API
app.get('/tasks', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const username = decoded.username;

    const response = await axios.get(
      `${DJANGO_URL}/tasks/?username=${username}`
    );
    res.json({
      tasks: response.data,
      username: username,
    });
  } catch (err) {
    console.error('Error fetching tasks:', err.message);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.post('/tasks', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const { title, description, effort_to_complete, due_date } = req.body;
    if (!title || !description || !effort_to_complete || !due_date)
      return res.status(400).json({ error: 'Missing required task fields' });

    const taskData = {
      title,
      description,
      effort_to_complete,
      due_date,
      created_by: decoded.username,
    };
    const response = await axios.post(`${DJANGO_URL}/tasks/`, taskData);

    res.json(response.data);
  } catch (err) {
    console.error('Error creating task:', err.message);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const { id } = req.params;
    const { title, description, effort_to_complete, due_date } = req.body;

    if (!title || !description || !effort_to_complete || !due_date)
      return res.status(400).json({ error: 'Missing required task fields' });

    const taskData = {
      title,
      description,
      effort_to_complete,
      due_date,
      created_by: decoded.username,
    };
    const response = await axios.put(`${DJANGO_URL}/tasks/${id}/`, taskData);

    res.json(response.data);
  } catch (err) {
    console.error('Error updating task:', err.message);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const { id } = req.params;

    const response = await axios.delete(`${DJANGO_URL}/tasks/${id}/`);

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err.message);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

app.listen(3001, () => {
  console.log('Node.js server running at http://localhost:3001');
});
