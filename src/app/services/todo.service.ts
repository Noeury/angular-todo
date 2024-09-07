import { Injectable } from '@angular/core';
import { Todo } from './interface/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoKey = 'todos';

  constructor() {}

  getAll(): Todo[] {
    const todos = localStorage.getItem(this.todoKey);
    return todos ? JSON.parse(todos) : [];
  }

  getOne(id: string): Todo | undefined {
    const todos: Todo[] = this.getAll();

    const todo = todos.find((todo) => todo.id === id);

    return todo;
  }

  create(todo: Todo) {
    const todos = this.getAll();
    todos.push(todo);
    localStorage.setItem(this.todoKey, JSON.stringify(todos));
  }

  removeTodo(index: number): void {
    const todos = this.getAll();
    todos.splice(index, 1);
    localStorage.setItem(this.todoKey, JSON.stringify(todos));
  }

  updateTodo(index: number, updatedTodo: Todo): void {
    const todos = this.getAll();
    todos[index] = updatedTodo;
    localStorage.setItem(this.todoKey, JSON.stringify(todos));
  }

  updateTodoStatus(index: number, status: boolean): void {
    const todos = this.getAll();
    todos[index].status = status;
    localStorage.setItem(this.todoKey, JSON.stringify(todos));
  }
}
