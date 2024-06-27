export class Attendance{
    userId:string
    assessmentId:number
    assessmentDate:string
    assessmentTime:string
    constructor(userId:string,assessmentId:number,assessmentDate:string,assessmentTime:string){
        this.userId = userId
        this.assessmentId = assessmentId
        this.assessmentDate = assessmentDate
        this.assessmentTime = assessmentTime
    }
}