import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

        @Post("create")
        createTask(@Body() body: {title: string, description: string}) {
            const task = this.taskService.createTask(body.title, body.description)
            
            return {
                statusCode: HttpStatus.CREATED,
                message: "Task created with success",
                data: task
            } 

        }

        @Get()
        getAll(){
            const tasks = this.taskService.getAllTasks();

            return {
                statusCode: HttpStatus.OK,
                message: "All tasks returned with success",
                data: tasks
            }
        }

        @Get(':id')
        getById(@Param('id') id: string){
            const task = this.taskService.getTaskById(id);
    
            if(!task){
                throw new HttpException("Task not found", HttpStatus.NOT_FOUND)
            }
    
            return{
                statusCode: HttpStatus.OK,
                message: "All tasks returned with success",
                data: task
            }
        }
}
