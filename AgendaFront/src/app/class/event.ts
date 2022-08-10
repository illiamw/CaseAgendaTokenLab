

export class Event {
  constructor(
      public title:string|null,
      public description: string|null,
      public invitation: string|null,
      public start: Date|null,
      public finish: Date|null,
      public id?: number,
      public accepted?: boolean
    ) {


    }


}
