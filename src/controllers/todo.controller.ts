import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const getTodos = async (req: Request, res: Response) => {
  const todos = await prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(todos);
};

export const getTodo = async (req: Request, res: Response) => {
  const todo = await prisma.todo.findUnique({ where: { id: Number(req.params.id) } });
  if (!todo) return res.status(404).json({ message: 'Not found' });
  res.json(todo);
};

export const createTodo = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const todo = await prisma.todo.create({ data: { title, content } });
  res.status(201).json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
  const { title, content, done } = req.body;
  const todo = await prisma.todo.update({
    where: { id: Number(req.params.id) },
    data: { title, content, done },
  });
  res.json(todo);
};
export const deleteTodo = async (req: Request, res: Response) => {
  await prisma.todo.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
};