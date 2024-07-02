export class Attendance{
    id:string
    userId:string
    assessmentId:number
    assessmentDate:string
    assessmentTime:string
    constructor(id:string,userId:string,assessmentId:number,assessmentDate:string,assessmentTime:string){
        this.id = id
        this.userId = userId
        this.assessmentId = assessmentId
        this.assessmentDate = assessmentDate
        this.assessmentTime = assessmentTime
    }
}