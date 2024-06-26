import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
    //task eh do tipo lista de tasks
    private tasks: Task[] = [];

    //método vai receber o titulo e a descrição e retorna o tipo Task
    createTask(title: string, description: string): Task {
        const newTask = new Task(title, description);
        this.tasks.push(newTask);

        return newTask;
    }

    getAllTasks(): Task[] {
        return this.tasks;
    }
    
    getTaskById(id: string): Task {
        return this.tasks.find((task) => task.id === id)
    }

    deleteTaskById(id: string): void {
        // let tasksAtualizadas: Task[] = [];
        // tasksAtualizadas = this.tasks.filter((task) => task.id !== id);
        // this.tasks = tasksAtualizadas;

        this.tasks = this.tasks.filter((task) => task.id !== id);
      }  

    updateTask(id:string, title: string, description: string, status: 'OPENED' | 'CLOSED'): Task{
        const task = this.getTaskById(id);
        if(!task) {
            return null;
        }

        task.title = title;
        task.description = description;
        task.status = status;

        return task
    }

    patchTask(id: string, updates: Partial<Task>): Task{
        const task = this.getTaskById(id);
        if(!task) {
            return null;
        }

        const campos = ['title', 'description', 'status'];

        Object.keys(updates).forEach((key) =>{
            if(campos.includes(key)){
                task[key] = updates[key]
            }
        });
        return task;
    }
}
