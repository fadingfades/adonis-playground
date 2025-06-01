/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import TodosController from '#controllers/todos_controller'

router.on('/').render('pages/home')

router.group(() => {
    router.get('home', [TodosController, 'index']).as('todo.home')
    router.post('/store', [TodosController, 'store']).as('todo.store')
    router.get('/edit/:id', [TodosController, 'edit']).as('todo.edit')
    router.post('/update/:id', [TodosController, 'update']).as('todo.update')
    router.post('/delete/:id', [TodosController, 'delete']).as('todo.delete')
}).prefix('/todo')