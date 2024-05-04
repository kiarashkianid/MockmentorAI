Class Assesment{
    constructor(assesmentQuestion, assesmentResponse, assesmentStatus){
        this.assesmentQuestion = assesmentQuestion;
        this.assesmentResponse = assesmentResponse;
        this.assesmentStatus = assesmentStatus;
    }
    const getStatus(){
        return this.assesmentStatus;
    }
    const getAssesmentQuestion(){
        return this.assesmentQuestion;
    }
    const getAssesmentResponse(){
        return this.assesmentResponse:
    }
    const setAssesmentResponse(assesmentResponse){
        this.assesmentResponse = assesmentResponse;
    }
    const setAssesmentQuestion(assesmentQuestion){
        this.assesmentQuestion = assesmentQuestion;
    }
    const setAssesmentStatus(assesmentStatus){
        this.assesmentStatus = assesmentStatus
    }