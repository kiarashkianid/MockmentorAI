package entities;

public class Assessment {
    private String assessmentQuestion;
    private String assessmentResponse;
    private boolean assessmentStatus;

    public Assessment(String assessmentQuestion, String assessmentResponse, boolean assessmentStatus) {
        this.assessmentQuestion = assessmentQuestion;
        this.assessmentResponse = assessmentResponse;
        this.assessmentStatus = assessmentStatus;
    }

    public String getAssessmentQuestion() {
        return this.assessmentQuestion;
    }

    public String getAssessmentResponse() {
        return this.assessmentResponse;
    }

    public boolean getAssessmentStatus() {
        return this.assessmentStatus;
    }

    public void setAssessmentResponse(String assessmentResponse) {
        this.assessmentResponse = assessmentResponse;
    }

    public void setAssessmentQuestion(String assessmentQuestion) {
        this.assessmentQuestion = assessmentQuestion;
    }

    public void setAssessmentStatus(boolean assessmentStatus) {
        this.assessmentStatus = assessmentStatus;
    }
}
