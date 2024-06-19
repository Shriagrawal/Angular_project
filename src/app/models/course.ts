export class Course{

    id : number
    cName : string 
    cDescription : string

    constructor(idno : number,cname: string,cdescription : string){
       this.cName = cname
       this.id = idno 
       this.cDescription = cdescription
    }

}