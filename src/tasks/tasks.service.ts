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
}
