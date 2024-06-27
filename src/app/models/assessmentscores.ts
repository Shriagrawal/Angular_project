export class AssessmentScores{
    assessmentId : number
    traineeId : number
    score : number
    ScoreArr : number[]
    id : number

    constructor(idno:number,asno:number,marks:number,traineeid:number,scorearr:number[]){
       this.assessmentId = asno
       this.traineeId = traineeid
       this.score = marks
       this.id = idno
       this.ScoreArr = scorearr
    }
}