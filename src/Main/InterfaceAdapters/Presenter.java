package InterfaceAdapters;

import useCase.OutputBoundary;
import useCase.OutputData;

public class Presenter implements OutputBoundary {
    @Override
    public void prepareSuccessView(OutputData outputData) {
        /**@CallResualtPage*/

    }

    @Override
    public void prepareFailView(String error) {

    }
}
