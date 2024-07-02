import { Question } from "./question"

export class Assessment{
    assessmentName : string
    flag : boolean
    id : string
    assessmentNo : number
    assesmentDate : string
    assessmentTime : number
    facultyid : number 
    question : number[] = []
    image : string
    price : number
    
    constructor(aName:string,answer:boolean,idno:string,asno:number,asdate:string,astime:number,facid:number,question:number[],img:string,price:number){
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