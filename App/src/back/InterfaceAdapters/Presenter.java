package useCase;

public class Presenter implements OutputBoundary {
    @Override
    public void prepareSuccessView(null) {
        System.out.println("Assessment passed.");
        //Call result page with pass or fail
    }

    @Override
    public void prepareFailView(String error) {
        System.out.println(error);
        //Call result page with pass or fail

    }
}