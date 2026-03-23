import express from 'express';
import todosRouter from './routes/todolist.js';

const app = express();
app.use(express.json());
app.use('/todolist', todosRouter);

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
