import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './components/todo/todo.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
  title = 'todo';
}
