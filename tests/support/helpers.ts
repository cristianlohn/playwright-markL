import { APIRequestContext, expect } from "@playwright/test"
import { TaskModel } from "../fixtures/task.model"

require('dotenv').config()

const BASE_API = process.env.BASE_API
//Função para remover taredas via request da API Helper
export async function deleteTaskByHelper(request: APIRequestContext, taskName: string) {
    await request.delete(`${BASE_API}/helper/tasks/${taskName}`)
}

//Função para cadastrar taredas via request
export async function postTask(request: APIRequestContext, task: TaskModel) {
    const newTask = await request.post(`${BASE_API}/tasks`, { data: task })
    expect(newTask.ok()).toBeTruthy()
}