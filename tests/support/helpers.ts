import { APIRequestContext, expect } from "@playwright/test"
import { TaskModel } from "../fixtures/task.model"

//Função para remover taredas via request da API Helper
export async function deleteTaskByHelper(request: APIRequestContext, taskName: string) {
    await request.delete('http://localhost:3333/helper/tasks/' + taskName)
}

//Função para cadastrar taredas via request
export async function postTask(request: APIRequestContext, task: TaskModel) {
    const newTask = await request.post('http://localhost:3333/tasks', { data: task })
    expect(newTask.ok()).toBeTruthy()
}