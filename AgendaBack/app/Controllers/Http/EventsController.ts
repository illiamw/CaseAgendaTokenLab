import { logger } from "./../../../config/app";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Event from "App/Models/Event";
import Guest from "App/Models/Guest";
import User from "App/Models/User";

export default class EventsController {
  public async create(ctx: HttpContextContract) {
    console.log("Event, Create: ", ctx.request.all());
    ctx.response.created({ info: "Registro com sucesso" });
    //Seriable request
    const user = ctx.request.input("user");
    const event = ctx.request.input("event");

    // Find User
    const userInstance = await User.find(user.email);

    // Create instance of event
    const eventInstance = new Event();
    eventInstance.start = event.start;
    eventInstance.finish = event.finish;
    eventInstance.title = event.title;
    eventInstance.description = event.description;

    try {
      // Related table
      if (userInstance != null && eventInstance != null) {
        // Condicion intersectionEvents
        try {
          if (
            await this.intersectionEvents(event.start, event.finish, user.email)
          ) {
            await userInstance.related("events").save(eventInstance);
            console.log(eventInstance.userEmail == userInstance.email);
            try {
              const novo = event.invitation;
              const guestsReplace = novo.replace(" ", "");
              console.log(guestsReplace);
              const guestsArray = guestsReplace.split(",");
              console.log(guestsArray);
              await this.guests(eventInstance, guestsArray, ctx);

              ctx.response.created({ info: "Registro de evento com sucesso" });
            } catch (error) {
              console.log(error);
            }
          } else {
            ctx.response.badRequest({
              info: "Registro com erro, sobreposição de eventos",
            });
          }
        } catch (error) {
          ctx.response.badRequest({ info: "Registro com erro, " + error.code });
        }
      }
    } catch (error) {
      ctx.response.badRequest({ info: "Registro com erro, " + error.code });
    }
  }

  private async guests(eventInstance: Event, guestsArray: Array<string>, ctx) {
    console.log("convidados");
    console.log(guestsArray);

    try {
      for await (const element of guestsArray) {
        console.log(element);

        const userInstance = await User.find(element);

        console.log("entrou");
        console.log(userInstance?.email);

        if (userInstance) {
          // Related One-To-One
          const guestInstance = new Guest();
          guestInstance.userEmail = userInstance.email;
          guestInstance.eventId = eventInstance.id;
          await guestInstance.save();
          console.log("criou");
        }
      }
    } catch (error) {
      ctx.response.badRequest({
        info: "Registro com erro, Convidado não encontrado" + error.code,
      });
    }
  }

  private async intersectionEvents(start: Date, finish: Date, email) {
    console.log("start", start);
    console.log("finish", finish);
    console.log("email", email);

    try {
      const user = (subquery) => {
        subquery.from("events").where("user_email", email).as("user");
      };

      const intersectStart = await Database.from(user)
        .where("user.start", "<=", start)
        .andWhere("user.finish", ">=", start)
        .count("* as total");

      const intersectFinish = await Database.from(user)
        .where("user.start", "<=", finish)
        .andWhere("user.finish", ">=", finish)
        .count("* as total");

      console.log(intersectStart[0].total);
      console.log(intersectFinish[0].total);

      if (intersectStart[0].total == 0 && intersectFinish[0].total == 0)
        return true;
      else return false;
    } catch (error) {
      console.error(error);
    }
  }

  public async read(ctx: HttpContextContract) {
    try {
      const email = ctx.request.input("email");
      const user = await User.find(email);

      const listEvents = await user?.related("events").query().select();
      console.log();

      ctx.response.created({ listEvents, info: "Login com sucesso!" });
    } catch (error) {
      ctx.response.badRequest({ info: "Registro com erro, " + error.code });
    }
  }

  public async getEvent(ctx: HttpContextContract) {
    console.log("getEvent");

    try {
      const id = ctx.params.id;
      const event = await Event.find(id);
      if (event)
        ctx.response.created({
          event,
          info: "Evento encontrado  com sucesso!",
        });
      else ctx.response.badRequest({ info: "Evento não encontrado" });
    } catch (error) {
      ctx.response.badRequest({ info: "Evento não encontrado, " + error.code });
    }
  }


  public async accept(ctx: HttpContextContract) {
    console.log("accept");

    try {
      const accept = ctx.request.input("accept");
      const id = ctx.request.input("id");
      const guest = await Guest.find(id);

      if(guest){
        guest.accepted = accept

        await guest.save()
        ctx.response.created({ info: "Evento aceito!" });

      }else
        ctx.response.badRequest({ info: "Convite com erro"});


    } catch (error) {
      ctx.response.badRequest({ info: "Convite com erro, " + error.code });
    }
  }

  public async readInvate(ctx: HttpContextContract) {
    console.log("readInvate");

    try {
      const email = ctx.request.input("email");
      const user = await User.find(email);
      if (user) {
        console.log(user.email);

        const guestsResultado = await Database.query()
          .from("guests")
          .join("events", (query) => {
            query
              .on("guests.event_id", "=", "events.id")
              .andOnVal("guests.user_email", user.email);
          })
          .select("events.*")
          .select("guests.accepted")
          .select("guests.id");

        if (guestsResultado != null) {
          console.log("tem");
          console.log(guestsResultado);

          ctx.response.created({
            guestsResultado,
            info: "Convidado(s) encontrado(s)  com sucesso!",
          });
        } else
          ctx.response.badRequest({
            info: "Convidado(s) encontrado(s) não encontrado",
          });
      } else
        ctx.response.badRequest({
          info: "Convidado(s) encontrado(s) não encontrado",
        });
    } catch (error) {
      ctx.response.badRequest({
        info: "Convidado(s) encontrado(s) não encontrado, " + error.code,
      });
    }
  }

  public async readGuest(ctx: HttpContextContract) {
    console.log("readGuest");

    try {
      const id = ctx.params.id;
      const event = await Event.find(id);
      if (event) {
        const guest = await Guest.query().where("eventId", event.id).select();

        if (guest != null) {
          const guestsResultado = guest.map((post) => post.serialize());
          console.log("entriy");
          ctx.response.created({
            guestsResultado,
            info: "Convidado(s) encontrado(s)  com sucesso!",
          });
        } else
          ctx.response.badRequest({
            info: "Convidado(s) encontrado(s) não encontrado",
          });
      } else
        ctx.response.badRequest({
          info: "Convidado(s) encontrado(s) não encontrado",
        });
    } catch (error) {
      ctx.response.badRequest({
        info: "Convidado(s) encontrado(s) não encontrado, " + error.code,
      });
    }
  }

  public async update(ctx: HttpContextContract) {
    console.log("Event, Create: ", ctx.request.all());
    ctx.response.created({ info: "Registro com sucesso" });
    //Seriable request
    const event = ctx.request.input("event");

    // Create instance of event
    const eventInstance = await Event.find(event.id);

    try {
      // Related table
      if (eventInstance != null) {
        eventInstance.start = event.start;
        eventInstance.finish = event.finish;
        eventInstance.title = event.title;
        eventInstance.description = event.description;
        await eventInstance.save();
        ctx.response.created({ info: "Registro de evento com sucesso" });
      } else {
        ctx.response.badRequest({ info: "Evento não encontrado" });
      }
    } catch (error) {
      ctx.response.badRequest({ info: "Registro com erro, " + error.code });
    }
  }

  public async delete(ctx: HttpContextContract) {
    console.log("DElete");

    try {
      const id = ctx.request.input("id");
      const event = await Event.find(id);
      if (event) {
        await event.delete();
        ctx.response.created({ info: "Remoção com sucesso! Redirecionando" });
      } else
        ctx.response.created({
          info: "Remoção com erro, elemento não encontrado",
        });
    } catch (error) {
      ctx.response.badRequest({ info: "Remoção com erro, " + error.code });
    }
  }
}
