import { Router, Request, Response } from 'express';
import { Todo } from '../types.js';

const router = Router();

let todos: Todo[] = [];
let nextId = 1;

// 전체 조회
router.get('/', (req: Request, res: Response) => {
  res.json(todos);
});

// 추가
router.post('/', (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: 'title 필요' });

  const todo: Todo = { id: nextId++, title, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// 완료 토글
router.patch('/:id', (req: Request, res: Response) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ message: '없는 항목' });

  todo.done = !todo.done;
  res.json(todo);
});

// 삭제
router.delete('/:id', (req: Request, res: Response) => {
  const idx = todos.findIndex(t => t.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ message: '없는 항목' });

  todos.splice(idx, 1);
  res.status(204).send();
});

export default router;