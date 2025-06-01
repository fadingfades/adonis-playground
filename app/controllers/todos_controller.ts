import type { HttpContext } from '@adonisjs/core/http'
import Todo from '#models/todo'

export default class TodosController {
    async index({ view }: HttpContext) {
        const todos = await Todo.all()

        return view.render('pages/todo', { todos })
    }

    async store({request, response}: HttpContext) {
        const {name, description, status} = request.body()
        await Todo.create({
            name,
            description,
            status: !!status
        })

        return response.redirect().toRoute('todo.home')
    }

    async edit({ view, request }: HttpContext) {
        const todoId = request.param('id')
        const todo = await Todo.findOrFail(todoId)

        return view.render('pages/edit_todo', { todo })
    }

    async update({ request, response }: HttpContext) {
        const todoId = request.param('id')
        const todo = await Todo.findOrFail(todoId)
        const {name, description, status} = request.body()

        await todo.merge({ name, description, status: !!status }).save()

        return response.redirect().toRoute('todo.home')
    }

    async delete({ request, response }: HttpContext) {
        const todoId = request.param('id')
        const todo = await Todo.findOrFail(todoId)

        await todo.delete()

        return response.redirect().toRoute('todo.home')
    }
}