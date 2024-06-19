export class Users{
    firstName : string 
    lastName : string 
    address : string
    id : number
    role : string
    constructor(fname : string,lname : string,addy : string,id:number, role:string){
       this.firstName = fname
       this.lastName = lname
       this.address = addy
       this.id = id
       this.role = role
    }

}