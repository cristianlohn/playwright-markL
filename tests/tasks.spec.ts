import { test, expect, request } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
import { deleteTaskByHelper, postTask } from './support/helpers'
import { TasksPage } from './support/pages/tasks'
import data from './fixtures/tasks.json'

let tasksPage: TasksPage

test.beforeEach(({ page }) => {
    tasksPage = new TasksPage(page)
})


test.describe('cadastro', () => {
    //Validar criação de tarefas através do botão de criação
    test('deve poder cadastrar uma nova tarefa clicando no botão adicionar', async ({ request }) => {

        // Dado que eu tenho uma nova tarefa
        const task = data.success as TaskModel

        await deleteTaskByHelper(request, task.name)

        // E estou na página de cadastro
        await tasksPage.go()

        // Quando faço o cadastro dessa tarefa usando o botão
        await tasksPage.createWithButton(task)

        // Então essa tarefa deve ser exibida na lista
        await tasksPage.shouldHaveText(task.name)
    })

    //Validar criação de tarefas através da tecla enter
    test('deve poder cadastrar uma nova tarefa teclando enter', async ({ request }) => {

        // Dado que eu tenho uma nova tarefa
        const task = data.sundingByEnter as TaskModel

        await deleteTaskByHelper(request, task.name)

        // E estou na página de cadastro
        await tasksPage.go()

        // Quando faço o cadastro dessa tarefa usando a tecla enter
        await tasksPage.createWithPressEnter(task)

        // Então essa tarefa deve ser exibida na lista
        await tasksPage.shouldToBeVisible(task.name)
    })

    //Validar tarefas duplicadas
    test('não deve permitir tarefa duplicada', async ({ request }) => {

        // Dado que eu tenho uma nova tarefa
        const task = data.duplicate as TaskModel

        //Remove tasks criadas
        await deleteTaskByHelper(request, task.name)

        //Cria task a ser duplicada
        await postTask(request, task)

        //E estou na página de cadastro
        await tasksPage.go()

        // Quando faço um novo cadastro com o mesmo nome de uma task existente
        await tasksPage.createWithButton(task)

        // Então devo receber um aviso de que não posso criar tarefas duplicadas
        await tasksPage.alertHaveText('Task already exists!')
    })

    test('Campo obrigatório', async () => {
        const task = data.required as TaskModel

        await tasksPage.go()
        await tasksPage.createWithButton(task)

        const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
        expect(validationMessage).toEqual('This is a required field')

    })
})

test.describe('atualização', () => {
    test('Deve concluir uma tarefa', async ({ request }) => {
        const task = data.update as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()
        await tasksPage.toggle(task.name)
        await tasksPage.shouldBeDone(task.name)
    })
})

test.describe('exclusão', () => {
    test('Deve excluir uma tarefa', async ({ request }) => {
        const task = data.delete as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()
        await tasksPage.remove(task.name)
        await tasksPage.shouldNotExist(task.name)
    })
})


