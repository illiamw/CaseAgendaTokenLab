import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  // Login User
  public async login (ctx: HttpContextContract){
    const email = ctx.request.input('email')
    const password = ctx.request.input('password')

    const user = await User.findBy('email', email)
    try {
      const token = await ctx.auth.use('api').attempt(email, password, {
        expiresIn: '30mins',
      })
      ctx.response.created({user, token, info:'Login com sucesso!'})
    } catch (error) {
      ctx.response.badRequest({info:'Credencial não confere, ' + error.code})
    }
  }

  // Create User
  public async create (ctx: HttpContextContract) {
    console.log(ctx.request.all())
    try {
      // Assign username and email
      const user = await User.create(ctx.request.all())//Seriable

      // Insert to the database
      await user.save()

      ctx.response.created({info: 'Registro com sucesso'})
    } catch (error) {
      ctx.response.badRequest({info: 'Registro com erro, ' + error.code})
    }
  }
}