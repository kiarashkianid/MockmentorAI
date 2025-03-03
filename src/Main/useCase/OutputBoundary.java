package useCase;

public interface OutputBoundary {
    void prepareSuccessView(null);
    void prepareFailView(String error);
}
