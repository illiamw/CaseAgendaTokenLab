import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userEmail: string

  @column()
  public title: string

  @column()
  public description: string | null

  @column.dateTime()
  public start: DateTime

  @column.dateTime()
  public finish: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
