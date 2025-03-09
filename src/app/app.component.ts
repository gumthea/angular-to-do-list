import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppService } from './app.service';
import { App } from './app.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tasks: App[] = [];
  newTaskTitle = '';
  newTaskCategory = 'Work';
  filterStatus: 'all' | 'completed' | 'pending' = 'all';

  constructor(private taskService: AppService) {
    this.tasks = this.taskService.getTasks();
  }

  addTask(): void {
    if (!this.newTaskTitle.trim()) return;
    const newTask: App = {
      id: Date.now(),
      title: this.newTaskTitle,
      completed: false,
      category: this.newTaskCategory
    };
    this.taskService.addTask(newTask);
    this.tasks = this.taskService.getTasks();
    this.newTaskTitle = '';
  }

  toggleComplete(task: App): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task);
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }

  get filteredTasks(): App[] {
    if (this.filterStatus === 'completed') {
      return this.tasks.filter(task => task.completed);
    }
    if (this.filterStatus === 'pending') {
      return this.tasks.filter(task => !task.completed);
    }
    return this.tasks;
  }
}
