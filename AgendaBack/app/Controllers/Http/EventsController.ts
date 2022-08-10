import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import Database from "@ioc:Adonis/Lucid/Database"
import Event from "App/Models/Event"
import Guest from "App/Models/Guest"
import User from "App/Models/User"

export default class EventsController {

  // Método responsável por criar um evento
  public async create(ctx: HttpContextContract) {
    //Seriable request
    const user = ctx.request.input("user")
    const event = ctx.request.input("event")

    // Find User
    const userInstance = await User.find(user.email)

    // Create instance of event
    const eventInstance = new Event()
    eventInstance.start = event.start
    eventInstance.finish = event.finish
    eventInstance.title = event.title
    eventInstance.description = event.description

    try {
      if (userInstance != null && eventInstance != null) {
        try {
          if (
            // Condicion intersectionEvents
            await this.intersectionEvents(event.start, event.finish, user.email)
          ) {
            // Related table events-users
            await userInstance.related("events").save(eventInstance)
            try {
              //Serializing Array-String
              const newArray = event.invitation
              const guestsReplace = newArray.replace(" ", "")
              const guestsArray = guestsReplace.split(",")

              //Submitting the invitations
              await this.guests(eventInstance, guestsArray, ctx)

              //Finishing success
              ctx.response.created({ info: "Event registration success" })
            } catch (error) {
              ctx.response.badRequest({
                info: "Error registration, guests",
              })
            }
          } else {
            ctx.response.badRequest({
              info: "Error registration, event overlay",
            })
          }
        } catch (error) {
          ctx.response.badRequest({
            info: "Error registration, " + error.code,
          })
        }
      }
    } catch (error) {
      ctx.response.badRequest({ info: "Error registration, " + error.code })
    }
  }

  // Método privado responsável vicular os convidados ao evento
  // Relação One-to-One
  private async guests(
    eventInstance: Event,
    guestsArray: Array<string>,
    ctx: HttpContextContract
  ) {
    try {
      await Guest.query().where("eventId", eventInstance.id).delete()
      for await (const element of guestsArray) {
        // Checking if the guest email exists in the database
        const userInstance = await User.find(element)

        if (userInstance) {
          // Related One-To-One
          const guestInstance = new Guest()
          guestInstance.userEmail = userInstance.email
          guestInstance.eventId = eventInstance.id
          await guestInstance.save()
          //Finishing success
        }
      }
    } catch (error) {
      ctx.response.badRequest({
        info: "Error registration, guest not found" + error.code,
      })
    }
  }

  //Médodo privado para verificar
  // - Intersecção entre eventos
  // - Se o inicio do evento não encontra-se depois
  private async intersectionEvents(start: Date, finish: Date, email) {
    // If the start of the event is not found after
    if (start < finish) {
      try {
        // Subquery to select all related user invites
        const user = (subquery) => {
          subquery.from("events").where("user_email", email).as("user")
        }

        // Checking if the start of the new event is not inserted between or on the boundary of another event
        const intersectStart = await Database.from(user)
          .where("user.start", "<=", start)
          .andWhere("user.finish", ">=", start)
          .count("* as total")

        // Checking if the end of the new event is not inserted between or on the boundary of another event
        const intersectFinish = await Database.from(user)
          .where("user.start", "<=", finish)
          .andWhere("user.finish", ">=", finish)
          .count("* as total")


        // Concatenating intersection conditions
        if (intersectStart[0].total == 0 && intersectFinish[0].total == 0)
          return true //Finishing success
        else return false
      } catch (error) {
        console.error(error)
      }
    } else return false
  }

  //Médodo  para verificar obter todos os eventos do usuário relacionado
  public async read(ctx: HttpContextContract) {
    try {

      // Deserializing request
      const email = ctx.request.input("email")
      const user = await User.find(email)

      // Query all event logs to the user
      const listEvents = await user?.related("events").query().select()

      //Finishing success
      ctx.response.created({
        listEvents,
        info: "Login successfully! Redirecting ...",
      })
    } catch (error) {
      ctx.response.badRequest({ info: "Error registration, " + error.code })
    }
  }

  //Médodo responsável por obter um evento mediante ID
  public async getEvent(ctx: HttpContextContract) {

    try {
      // Deserializing request
      const id = ctx.params.id
      const event = await Event.find(id)

      if (event)
        ctx.response.created({
          event,
          info: "Event found successfully!",
        })//Finishing success
      else ctx.response.badRequest({ info: "Event not found" })
    } catch (error) {
      ctx.response.badRequest({ info: "Event not found, " + error.code })
    }
  }

  //Médodo responsável por alternar a intenção de participação do usuário como convidado
  public async accept(ctx: HttpContextContract) {

    try {
      // Deserializing request
      const accept = ctx.request.input("accept")
      const id = ctx.request.input("id")

      // Finding invitation
      const guest = await Guest.find(id)


      if (guest) {
        guest.accepted = accept
        await guest.save()//Finishing success

        //Handling status for customer return
        if (accept) ctx.response.created({ info: "Event accepted!" })
        else ctx.response.created({ info: "Event Denied!" })

      } else ctx.response.badRequest({ info: "Invitation with error" })
    } catch (error) {
      ctx.response.badRequest({ info: "Invitation with error, " + error.code })
    }
  }

  // Método responsável por obter a lista de convites a eventos
  public async readInvate(ctx: HttpContextContract) {


    try {
      // Deserializing request
      const email = ctx.request.input("email")
      const user = await User.find(email)

      if (user) {

        // Query with full join between guest and events tables to get event information and id corresponding to the invitation
        const guestsResultado = await Database.query()
          .from("guests")
          .join("events", (query) => {
            query
              .on("guests.event_id", "=", "events.id")
              .andOnVal("guests.user_email", user.email)
          })
          .select("events.*")
          .select("guests.accepted")
          .select("guests.id")

        if (guestsResultado != null) {
          //Finishing success
          ctx.response.created({
            guestsResultado,
            info: "Guest(s) successfully found!",
          })
        } else
          ctx.response.badRequest({
            info: "Guest(s) found not found",
          })
      } else
        ctx.response.badRequest({
          info: "Guest(s) found not found",
        })
    } catch (error) {
      ctx.response.badRequest({
        info: "Guest(s) found not found, " + error.code,
      })
    }
  }

  // Método responsável por obter a lista de convidados a um evento
  public async readGuest(ctx: HttpContextContract) {
    try {
      // Deserializing request
      const id = ctx.params.id
      const event = await Event.find(id)

      if (event) {
        //Query for guest list
        const guest = await Guest.query().where("eventId", event.id).select()

        if (guest != null) {
          //Serializing query return to corresponding model in frontend
          const guestsResultado = guest.map((post) => post.serialize())

          //Finishing success
          ctx.response.created({
            guestsResultado,
            info: "Guest(s) successfully found!",
          })
        } else
          ctx.response.badRequest({
            info: "Guest(s) found not found",
          })
      } else
        ctx.response.badRequest({
          info: "Guest(s) found not found",
        })
    } catch (error) {
      ctx.response.badRequest({
        info: "Guest(s) found not found, " + error.code,
      })
    }
  }

  // Método responsável por atualizar um evento
  public async update(ctx: HttpContextContract) {

    //Deseriable request
    const event = ctx.request.input("event")

    // Create instance of event
    const eventInstance = await Event.find(event.id)

    try {
      // Related table
      if (eventInstance != null) {
        eventInstance.start = event.start
        eventInstance.finish = event.finish
        eventInstance.title = event.title
        eventInstance.description = event.description

        //Serializing Array-String
        const newArray = event.invitation
        const guestsReplace = newArray.replace(" ", "")
        const guestsArray = guestsReplace.split(",")

        //Submitting the invitations
        await this.guests(eventInstance, guestsArray, ctx)

        await eventInstance.save()
        //Finishing success
        ctx.response.created({ info: "Event registration success" })
      } else {
        ctx.response.badRequest({ info: "Event not found" })
      }
    } catch (error) {
      ctx.response.badRequest({ info: "Error registration, " + error.code })
    }
  }

  // Método resposável por Deletar um evento
  public async delete(ctx: HttpContextContract) {

    try {
      //Deseriable request
      const id = ctx.request.input("id")
      const event = await Event.find(id)

      if (event) {
        await event.delete()//Finishing success
        ctx.response.created({ info: "Successful removal! Redirecting ..." })
      } else
        ctx.response.created({
          info: "Error removal, event not found",
        })
    } catch (error) {
      ctx.response.badRequest({ info: "Error removal, " + error.code })
    }
  }
}
