package entities;

public class Subject  {
    private String subjectName;
    private Assessment assessment;

    public Subject(String subjectName, Assessment assessment) {
        this.subjectName = subjectName;
        this.assessment = assessment;
    }

    public String getSubjectName() {
        return this.subjectName;
    }

    public void setAssessment(Assessment assessment) {
        this.assessment = assessment;
    }

    public Assessment getAssessment() {
        return this.assessment;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }
}
