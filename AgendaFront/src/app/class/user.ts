

export class User {
  constructor(
      public name:string|null,
      public lastname: string,
      public email: string,
      public password?: string

    ) {


    }

    private checkName (name: string): boolean{
      if (name.length >= 3){
        return false
      }
      return true
    }
}
