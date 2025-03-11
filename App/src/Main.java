package App;

from App import api,entities,InterfaceAdapters,useCase

//connect this to view somehow , from view, you dont need much just a inmemory user to initialize , so maybe finish the
// js part of the project to the point that you get a inmemory useer ,then at the end call back the js part from here


public class Main {
    public static void main(String[] args) {
        // Create an instance of the OutputBoundary implementation
        OutputBoundary outputBoundary = new OutputBoundaryImplementation();

        // Create an instance of the Interactor class
        Interactor interactor = new Interactor(outputBoundary);

        // Create an instance of the Controller class
        Controller controller = new Controller(interactor);
        controller.execute();

        // Now you can use the controller instance
        // For example, you can call the execute method with a User instance
        // User user = new User(...);
        // controller.execute(user);
    }
}