import { Question } from "./question"

export class Assessment{
    assessmentName : string
    flag : boolean
    id : number
    assessmentNo : number
    assesmentDate : string
    assessmentTime : string
    facultyid : number 
    question : number[] = []
    image : string
    price : number
    
    constructor(aName:string,answer:boolean,idno:number,asno:number,asdate:string,astime:string,facid:number,question:number[],img:string,price:number){
        this.assessmentName = aName
        this.flag = answer
        this.id = idno
        this.assessmentNo = asno
        this.assesmentDate = asdate
        this.assessmentTime = astime
        this.facultyid = facid
        this.question = question
        this.image = img
        this.price = price
    }

}