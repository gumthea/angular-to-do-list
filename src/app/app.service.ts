import { Injectable } from '@angular/core';
import { App } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly STORAGE_KEY = 'tasks';

  getTasks(): App[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  saveTasks(tasks: App[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }

  addTask(task: App): void {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  updateTask(updatedTask: App): void {
    let tasks = this.getTasks().map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.saveTasks(tasks);
  }

  deleteTask(id: number): void {
    let tasks = this.getTasks().filter(task => task.id !== id);
    this.saveTasks(tasks);
  }
}
