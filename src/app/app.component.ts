import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './components/todo/todo.component';
import { initFlowbite } from 'flowbite';
import { toast, NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListComponent, NgxSonnerToaster],
  template: `
    <ngx-sonner-toaster />
    <button (click)="toast('My first toast')">Give me a toast</button>
  `,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'todo';
  protected readonly toast = toast;

  ngOnInit(): void {
    initFlowbite();
  }
}
