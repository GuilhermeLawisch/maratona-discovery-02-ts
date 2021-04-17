import express from 'express';
import '@controllers/JobController';

const app = express();

app.get('/', (req, res) => {
  return res.json({ massage: 'Hello World' })
})

app.listen(3333, () => {
  console.log('Server is running in http://localhost:3333')
})

