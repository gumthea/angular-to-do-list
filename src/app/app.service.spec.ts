import { TestBed } from '@angular/core/testing';
import { AppService } from './app.service';
import { App } from './app.model';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppService);

    // Mock localStorage
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return JSON.stringify([]);
    });
    spyOn(localStorage, 'setItem').and.callFake(() => {});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array when no tasks exist', () => {
    expect(service.getTasks()).toEqual([]);
  });

  it('should add a new task', () => {
    const task: App = { id: 1, title: 'Test Task', completed: false, category: 'Work' };
    service.addTask(task);
    expect(localStorage.setItem).toHaveBeenCalledWith('tasks', JSON.stringify([task]));
  });

  it('should update an existing task', () => {
    const task: App = { id: 1, title: 'Test Task', completed: false, category: 'Work' };
    service.addTask(task);

    const updatedTask: App = { ...task, completed: true };
    service.updateTask(updatedTask);

    expect(localStorage.setItem).toHaveBeenCalledWith('tasks', JSON.stringify([updatedTask]));
  });

  it('should delete a task', () => {
    const task: App = { id: 1, title: 'Test Task', completed: false, category: 'Work' };
    service.addTask(task);
    service.deleteTask(task.id);

    expect(localStorage.setItem).toHaveBeenCalledWith('tasks', JSON.stringify([]));
  });
});
