import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';



@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) { }

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

        @Delete(':id')
        deleteById(@Param('id') id: string) {
            this.taskService.deleteTaskById(id);
            return {
                statusCode: HttpStatus.NO_CONTENT,
                message: "Task deleted with success",
            };
        }
    
        @Put(':id')
        updateTask(
            @Param('id') id:string,
            @Body() body: {title: string, description:string, status: 'OPENED' | 'CLOSED'}
        ){
           const task = this.taskService.updateTask(id, body.title, body.description, body.status) 
    
           if(!task) {
            throw new HttpException("Task not found", HttpStatus.NOT_FOUND)
           }
           return{
            statusCode: HttpStatus.OK,
            message: "Task updated successfully",
            data: task
           }
        }
    
        @Patch('/edit/:id')
        patchTask(
            @Param('id') id: string,
            @Query() updates: Partial<Task>
        ){
            const task = this.taskService.patchTask(id, updates)
            return{
                statusCode: HttpStatus.OK,
                message:  "Task updated successfully",
                data: task
               }
        }    
}
