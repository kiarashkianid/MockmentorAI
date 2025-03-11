package api;

import okhttp3.*;
import org.json.JSONObject;

import java.io.IOException;

public class OpenAICompletionAPI {

    // API key for authentication, retrieved from environment variables for security
    static final String API_KEY = System.getenv("OPENAI_API_KEY");

    // URL for the OpenAI API endpoint
    static final String API_URL = "https://api.openai.com/v1/chat/completions";

    /**
     * Method to get a completion from the OpenAI API based on the provided prompt.
     *
     * @param prompt The prompt to send to the OpenAI API.
     * @return The completion text returned by the OpenAI API.
     */
    public static String getCompletion(String prompt) {
        // Create an OkHttpClient instance
        OkHttpClient client = new OkHttpClient().newBuilder().build();

        // Define the media type for the request body
        MediaType mediaType = MediaType.parse("application/json");

        // Construct the request body with the prompt and other parameters
        String requestBody = "{\"messages\": [{\"role\": \"system\",\"content\": \"prompt: " + prompt + "\"}],\"max_tokens\": 150,\"model\": \"gpt-3.5-turbo-1106\"}";
        RequestBody body = RequestBody.create(mediaType, requestBody);

        // Build the HTTP request with the API URL, method, headers, and body
        Request request = new Request.Builder()
                .url(API_URL)
                .method("POST", body)
                .addHeader("Authorization", "Bearer " + API_KEY)
                .build();

        try {
            // Execute the request and get the response
            Response response = client.newCall(request).execute();

            // Check if the response is successful
            if (!response.isSuccessful()) {
                throw new IOException("Unexpected code " + response);
            }

            // Get the response body as a string
            String responseBody = response.body().string();

            // Parse the response JSON to extract the completion text
            JSONObject jsonResponse = new JSONObject(responseBody);
            return jsonResponse.getJSONArray("choices").getJSONObject(0).getString("text");
        } catch (IOException e) {
            // Print the stack trace and return an error message in case of an exception
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }
}