// write your code in TypeScript

import { Component } from "@angular/core";

@Component({
  selector: "todo-list",
  template: `
  <div>TODO LIST</div> 
  <form (ngSubmit)="add()">
    <input type="text" name="todoInput" [(ngModel)]="todoInput">
    <button type="submit">Add</button><br>
    <span *ngIf="!!errorMessage">{{errorMessage}}</span><br>
    <span class="task-counter">{{remainingTasks}} remaining out of {{tasks.length}} tasks</span>
  </form>
  <ul>
    <li *ngFor="let task of tasks" (click)="toggleTaskDone(task)"
        [class.is-done]="task.isComplete">
      {{task.name}}
      </li>
  </ul>
  `,
  styles: [
    `
      .is-done
        text-decoration: line-through
    `,
  ],
})
export class TodoListComponent {

  todoInput: string = '';
  errorMessage: string = '';
  tasks: Array<Task> = [];
  remainingTasks: number = 0;

  add(): void {
    this.errorMessage = '';
    if (!!this.todoInput) {
      this.tasks.push({name: this.todoInput, isComplete: false});
      this.todoInput = '';
      this._calculateRemainingTasks();
    } else {
      this.errorMessage = 'Task name cannot be empty. Please, type your task name';
    }
  }

  toggleTaskDone(task: Task): void {
    task.isComplete = !task.isComplete;
    this._calculateRemainingTasks();
  }

  private _calculateRemainingTasks() {
    this.remainingTasks = 0;
    this.tasks.forEach(task => {
      if (!task.isComplete) this.remainingTasks++;
    });
  }

}

export interface Task {
  name: string;
  isComplete: boolean;
}
