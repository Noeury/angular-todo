import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../services/interface/todo.interface';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class ListComponent implements OnInit {
  todoForm!: FormGroup;
  TodoService = inject(TodoService);
  fb = inject(FormBuilder);

  todos: Todo[] = [];
  isEditing = false;
  editIndex: number | null = null;

  ngOnInit(): void {
    this.initForm();
    this.loadTodoList();
  }

  initForm() {
    this.todoForm = this.fb.group({
      id: [Date.now()],
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: [Date, Validators.required],
      time: ['', Validators.required],
      status: [false],
    });
  }

  saveTodo() {
    if (this.todoForm.valid) {
      const formValues = this.todoForm.value;
      const updatedTodo: Todo = {
        ...formValues,
        date: new Date(formValues.date),
      };

      if (this.isEditing && this.editIndex !== null) {
        this.TodoService.updateTodo(this.editIndex, updatedTodo);
        this.isEditing = false;
        this.editIndex = null;
      } else {
        this.TodoService.create(updatedTodo);
      }

      this.loadTodoList();

      this.todoForm.reset({ id: Date.now(), status: false });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  editTodo(index: number): void {
    const todo = this.todos[index];

    if (!(todo.date instanceof Date)) {
      todo.date = new Date(todo.date);
    }

    this.todoForm.patchValue({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      date: todo.date.toISOString().split('T')[0],
      time: todo.time,
      status: todo.status,
    });

    this.isEditing = true;
    this.editIndex = index;
  }

  loadTodoList() {
    this.todos = this.TodoService.getAll();
  }

  removeTodo(index: number): void {
    this.TodoService.removeTodo(index);
    this.loadTodoList();
  }

  toggleStatus(index: number): void {
    const todo = this.todos[index];
    this.TodoService.updateTodoStatus(index, !todo.status);
    this.loadTodoList();
  }

  OnSubmit() {
    this.saveTodo();
  }
}
