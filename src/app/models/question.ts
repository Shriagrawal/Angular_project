export class Question{
    id : number
    qText : string
    options : string[]
    answer : string
    qType : string

    constructor(idno : number,qtext : string,variety : string[],solution : string,qtype : string){
       this.qText = qtext
       this.id = idno 
       this.options = variety
       this.answer = solution
       this.qType = qtype
    }

}