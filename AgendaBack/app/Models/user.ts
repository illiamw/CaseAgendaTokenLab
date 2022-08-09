import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, HasMany, hasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'
import Guest from './Guest'

export default class User extends BaseModel {
  public static primaryKey = 'email'
  @column({ isPrimary: true })
  public email: string

  @column()
  public name: string

  @column()
  public lastname: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Event)
  public events: HasMany<typeof Event>

  @manyToMany(() => Guest)
  public skills: ManyToMany<typeof Guest>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
