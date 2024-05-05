package useCase;

public interface OutputBoundary {
    void prepareSuccessView(OutputData outputData);
    void prepareFailView(String error);
}
