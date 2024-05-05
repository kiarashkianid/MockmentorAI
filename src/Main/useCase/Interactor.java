package useCase;

import api.OpenAICompletionAPI;

import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Interactor implements InputBoundary {
    @Override
    public void execute(InputData inputData) {

        int num = inputData.inMemoryUser.getSubjectList().size();

        Random random = new Random();
        int lucky = random.nextInt(num);




        //(change for 1 question only)The following block is responsible for final assesment of tutor all responses to the questions
            String prompt = "Asses the tutor response:${response} to question :${api_question} with respect to (2points per)Engage effectively,Feedback clarity,Session management,Adapt explanation,Reflect development, final response is pass or fail(is fail<6)";
            String api_response = OpenAICompletionAPI.getCompletion(prompt);


            // Define the regular expression pattern
            String regex = "\"content\":s*\"([^\"]+)";

            // Sample string containing the pattern

            // Create a Pattern object
            Pattern pattern = Pattern.compile(regex);

            // Create a Matcher object
            Matcher matcher = pattern.matcher(api_response);


            // Check if a match was found
            if (matcher.find()) {
                // Access the captured text using group(1)
                String capturedText = matcher.group(1);
                System.out.println("Captured text: " + capturedText);
            } else {
                System.out.println("No match found.");
            }
        }
        }