package api;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.speech.v1.*;
import com.google.protobuf.ByteString;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class VoiceToText {

    public static void main(String[] args) {
        try {
            String projectId = "pro-contact-422317-t2";
            String keyFilePath = "C:\\Users\\Kiarash\\IdeaProjects\\GDSCHacks\\src\\test\\java\\Api\\my-service-account-key.json";

            // Initialize Google Cloud credentials
            GoogleCredentials credentials = GoogleCredentials.fromStream(Files.newInputStream(Paths.get(keyFilePath)))
                    .createScoped(SpeechSettings.getDefaultServiceScopes());

            SpeechSettings settings = SpeechSettings.newBuilder()
                    .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                    .build();

            try (SpeechClient speechClient = SpeechClient.create(settings)) {
                // The path to the audio file to transcribe
                String audioFilePath = "C:\\Users\\Kiarash\\IdeaProjects\\GDSCHacks\\target\\OSR_us_000_0010_8k.wav";
                Path path = Paths.get(audioFilePath);
                byte[] data = Files.readAllBytes(path);
                ByteString audioBytes = ByteString.copyFrom(data);

                // Configure recognition request
                RecognitionConfig config = RecognitionConfig.newBuilder()
                        .setEncoding(RecognitionConfig.AudioEncoding.LINEAR16)
                        .setLanguageCode("en-US")
                        .build();

                RecognitionAudio audio = RecognitionAudio.newBuilder()
                        .setContent(audioBytes)
                        .build();

                // Perform the speech recognition
                RecognizeResponse response = speechClient.recognize(config, audio);
                for (SpeechRecognitionResult result : response.getResultsList()) {
                    // Print the transcription
                    System.out.println("Transcription: " + result.getAlternativesList().get(0).getTranscript());
                }
            } catch (IOException e) {
                System.err.println("Failed to read audio file: " + e.getMessage());
            }
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}