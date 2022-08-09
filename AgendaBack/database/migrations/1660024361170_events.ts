import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 30).defaultTo('New Event')
      table.string('description', 255)
      table.dateTime('start', { useTz: true }).notNullable()
      table.dateTime('finish', { useTz: true }).notNullable()
      table
        .string('user_email')
        .references('users.email')
        .onDelete('CASCADE') // delete post when user is deleted

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.dateTime('created_at', { useTz: true })
      table.dateTime('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
