import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'


export default class Guest extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userEmail: string

  @column()
  public eventId: number

  @column()
  public accepted: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


}
