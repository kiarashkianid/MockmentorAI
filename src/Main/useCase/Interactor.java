package useCase;

import api.OpenAICompletionAPI;
import entities.Assessment;
import entities.Subject;

import java.util.List;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Interactor implements InputBoundary {
    private final OutputBoundary outputBoundary;

    public Interactor(OutputBoundary outputBoundary) {
        this.outputBoundary = outputBoundary;
    }

    @Override
    public void execute(InputData inputData) {
        List<Subject> subjectList = inputData.inMemoryUser.getSubjectList();

        // Generate a random question from the subject list
        Random rand = new Random();
        int randomIndex = rand.nextInt(subjectList.size());
        Subject selectedSubject = subjectList.get(randomIndex);
        Assessment assessment = selectedSubject.getAssessment();
        String api_question = assessment.getAssessmentQuestion();

        // Generate a response to the question
        String response = OpenAICompletionAPI.getCompletion(api_question);

        // Assess the tutor's response to the question
        String prompt = "Assess the tutor response: " + response + " to question: " + api_question + " with respect to (2 points per) Engage effectively, Feedback clarity, Session management, Adapt explanation, Reflect development, final response is pass or fail (is fail < 6)";
        String api_response = OpenAICompletionAPI.getCompletion(prompt);

        // Define the regular expression pattern to look for "pass" or "fail"
        String regex = "\\b(pass|fail)\\b";

        // Create a Pattern object
        Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);

        // Create a Matcher object
        Matcher matcher = pattern.matcher(api_response);

        // Define the result flag
        boolean result = false;

        // Check if a match was found and set the result flag
        while (matcher.find()) {
            String capturedText = matcher.group(1);
            if (capturedText.equalsIgnoreCase("fail")) {
                result = false;
                break;
            } else if (capturedText.equalsIgnoreCase("pass")) {
                result = true;
            }
        }

        // Use the result flag as needed
        assessment.setAssessmentStatus(result);

        // Call the appropriate OutputBoundary method
        if (result) {
            outputBoundary.prepareSuccessView(null);
        } else {
            outputBoundary.prepareFailView("Assessment failed.");
        }
    }
}