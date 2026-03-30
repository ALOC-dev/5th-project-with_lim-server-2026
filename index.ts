import express from 'express';
import cors from 'cors';
import todosRouter from './routes/todolist';

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use('/todolist', todosRouter);

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
