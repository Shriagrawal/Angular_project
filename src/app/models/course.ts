export class Course{
    id : string
    cName : string 
    cDescription : string
    constructor(idno : string,cname: string,cdescription : string){
       this.cName = cname
       this.id = idno 
       this.cDescription = cdescription
    }
}