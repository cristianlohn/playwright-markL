import { test, expect } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
import { deleteTaskByHelper, postTask } from './support/helpers'
import { TasksPage } from './support/pages/tasks'

//Validar criação de tarefas através do botão de criação
test('deve poder cadastrar uma nova tarefa clicando no botão adicionar', async ({ page, request }) => {
    const tasksPage: TasksPage = new TasksPage(page)

    // Dado que eu tenho uma nova tarefa
    const task: TaskModel = {
        name: 'Criar tarefa usando botão',
        is_done: false
    }

    await deleteTaskByHelper(request, task.name)

    // E estou na página de cadastro
    await tasksPage.go()

    // Quando faço o cadastro dessa tarefa usando o botão
    await tasksPage.create(task)

    // Então essa tarefa deve ser exibida na lista
    await tasksPage.shouldHaveText(task.name)
})

//Validar criação de tarefas através da tecla enter
test('deve poder cadastrar uma nova tarefa teclando enter', async ({ page, request }) => {
    const tasksPage: TasksPage = new TasksPage(page)

    // Dado que eu tenho uma nova tarefa
    const task: TaskModel = {
        name: 'Criar tarefa usando tecla Enter',
        is_done: false
    }

    await deleteTaskByHelper(request, task.name)

    // E estou na página de cadastro
    await tasksPage.go()

    // Quando faço o cadastro dessa tarefa usando a tecla enter
    await tasksPage.create(task)

    // Então essa tarefa deve ser exibida na lista
    await tasksPage.shouldToBeVisible(task.name)
})

//Validar tarefas duplicadas
test('não deve permitir tarefa duplicada', async ({ page, request }) => {
    const tasksPage: TasksPage = new TasksPage(page)

    // Dado que eu tenho uma nova tarefa
    const task: TaskModel = {
        name: 'Criar tarefa duplicada',
        is_done: false
    }

    //Remove tasks criadas
    await deleteTaskByHelper(request, task.name)

    //Cria task a ser duplicada
    await postTask(request, task)

    //E estou na página de cadastro
    await tasksPage.go()

    // Quando faço um novo cadastro com o mesmo nome de uma task existente
    await tasksPage.create(task)

    // Então devo receber um aviso de que não posso criar tarefas duplicadas
    await tasksPage.alertHaveText('Task already exists!')
})