import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const getTodos = async (req: Request, res: Response) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
};

export const createTodo = async (req: Request, res: Response) => {
  const { content } = req.body;
  const todo = await prisma.todo.create({ data: { content } });
  res.status(201).json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
  const { content, done } = req.body;
  const todo = await prisma.todo.update({
    where: { id: Number(req.params.id) },
    data: { content, done },
  });
  res.json(todo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  await prisma.todo.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
};