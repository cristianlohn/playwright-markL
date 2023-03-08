import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

test('deve poder cadastrar uma nova tarefa clicando no botão adicionar', async ({ page, request }) => {

    // Dado que eu tenho uma nova tarefa
    const taskName = 'Criar tarefa usando botão'
    await request.delete('http://localhost:3333/helper/tasks/' + taskName)
    
    // E estou na página de cadastro
    await page.goto('http://localhost:3000/')

    // Quando faço o cadastro dessa tarefa usando o botão
    const inputTaskName = page.locator('input[class*=InputNewTask]')
    await inputTaskName.fill(taskName)
    
    await page.click('css=button >> text=Create')

    // Então essa tarefa deve ser exibida na lista
    const target = page.locator(`css=.task-item p >> text=${taskName}`)
    await expect(target).toHaveText(taskName)
    


})

test('deve poder cadastrar uma nova tarefa teclando enter', async ({ page, request }) => {
    
    // Dado que eu tenho uma nova tarefa
    const taskName = 'Criar tarefa usando tecla Enter'
    await request.delete('http://localhost:3333/helper/tasks/' + taskName)

    // E estou na página de cadastro
    await page.goto('http://localhost:3000/')

    // Quando faço o cadastro dessa tarefa usando a tecla enter
    const inputTaskName = page.locator('input[class*=InputNewTask]')
    await inputTaskName.fill(taskName)
    
    await page.click('css=button >> text=Create')

    // Então essa tarefa deve ser exibida na lista
    const target = page.locator(`css=.task-item p >> text=${taskName}`)
    await expect(target).toBeVisible()

})