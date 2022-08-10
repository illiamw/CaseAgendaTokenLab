/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // CRUD - event operations
  Route.post('/rectricted/create', 'EventsController.create')
  Route.post('/rectricted/read', 'EventsController.read')
  Route.post('/rectricted/delete', 'EventsController.delete')
  Route.post('/rectricted/update', 'EventsController.update')
  // Guest operations
  Route.post('/rectricted/accept', 'EventsController.accept')
  Route.post('/rectricted/readInvate', 'EventsController.readInvate')
  Route.get('/rectricted/getEvent/:id', 'EventsController.getEvent')
  Route.get('/rectricted/readGuest/:id', 'EventsController.readGuest')
}).middleware('auth')

//User control operations
Route.post('/login', 'AuthController.login')
Route.post('/create', 'AuthController.create')

