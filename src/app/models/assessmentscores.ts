export class AssessmentScores{
    assessmentId : number
    traineeId : number
    score : number
    id : number

    constructor(idno:number,asno:number,marks:number,traineeid:number){
       this.assessmentId = asno
       this.traineeId = traineeid
       this.score = marks
       this.id = idno
    }
}