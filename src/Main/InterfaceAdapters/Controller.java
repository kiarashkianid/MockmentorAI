package InterfaceAdapters;

import entities.User;
import useCase.InputBoundary;
import useCase.InputData;

public class Controller {
    final InputBoundary interactor;
    public Controller (InputBoundary interactor){
        this.interactor=interactor;
    }
    public void execute (User inMemoryUser) {
        InputData inputData = new InputData(inMemoryUser);
        interactor.execute(inputData);
    }
}
