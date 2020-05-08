export class User {
    constructor(public id:string , public email:string , private _token:string , public tokenExpiration:Date) {
        
    }

    get token(){
        if(!this.tokenExpiration || this.tokenExpiration < new Date){
            return false
        }
        return this._token;
    }

    get tokenDuration() {
        if (!this.token) {
          return 0;
        }
        
        return this.tokenExpiration.getTime() - new Date().getTime();
      }
}