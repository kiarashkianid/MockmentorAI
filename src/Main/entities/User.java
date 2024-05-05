package entities;

import java.util.List;

public class User {
    private String username;
    private String password;
    private List<Subject> subjectList;
    private boolean tutorStatus;

    public User(String username, String password, List<Subject> subjectList, boolean tutorStatus) {
        this.username = username;
        this.password = password;
        this.subjectList = subjectList;
        this.tutorStatus = tutorStatus;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setSubjectList(List<Subject> subjectList) {
        this.subjectList = subjectList;
    }

    public void setTutorStatus(boolean tutorStatus) {
        this.tutorStatus = tutorStatus;
    }

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }

    public List<Subject> getSubjectList() {
        return this.subjectList;
    }

    public boolean getTutorStatus() {
        return this.tutorStatus;
    }
}
