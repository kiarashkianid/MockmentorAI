package api;
import okhttp3.*;

import java.io.IOException;
public class OpenAICompletionAPI {

    static final String API_KEY = "sk-proj-91kMBqd5vdNtVkZZXbjrT3BlbkFJCatPW6b2TrxbPVlgNQIe";
    static final String API_URL = "https://api.openai.com/v1/chat/completions";

    public  static String getCompletion(String prompt) {
        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        MediaType mediaType = MediaType.parse("application/json");
        String requestBody = "{\"messages\": [{\"role\": \"system\",\"content\": \"prompt: " + prompt + "\"}],\"max_tokens\": 150,\"model\": \"gpt-3.5-turbo-1106\"}";
        RequestBody body = RequestBody.create(mediaType, requestBody);
        Request request = new Request.Builder()
                .url(API_URL)
                .method("POST", body)
                .addHeader("Authorization", "Bearer " + API_KEY)
                .build();
        try {
            Response response = client.newCall(request).execute();
            return response.body().string();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) {
        OpenAICompletionAPI openAICompletionAPI = new OpenAICompletionAPI();
        String prompt = "Once upon a time";
        String completion = getCompletion(prompt);
        System.out.println(completion);
    }
}

