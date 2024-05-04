class User implements DataAccessInterface {

    constructor(username, password, subjectList, tutorStatus) {
        this.username = username;
        this.password = password;
        this.subjectList = subjectList;
        this.tutorStatus = tutorStatus;
    };
    const setUsername(username) {
        this.username = username;
    }
    const setPassword(password) {
        this.password = password;
    }
    const setSubjectList(subjectList) {
        this.subjectList = subjectList;
    }
    const setTutorStatus(tutorStatus) {
        this.tutorStatus = tutorStatus;
    }
    const getUsername() {
        return this.username;
    }
    const getPassword() {
        return this.password
    }
    const getSubjectList() {
        return this.subjectList;
    }
    const getTutorStatus() {
        return this.tutorStatus;
    }
}