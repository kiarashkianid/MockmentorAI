/*Recieves the JSON payload from the frontend index.js , process the data and sends a response back to the frontend*/



import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    // Handle login requests
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        // Here, implement logic to check the username and password
        System.out.println("Username: " + user.getUsername());
        System.out.println("Password: " + user.getPassword());

        // For now, return a success response
        return ResponseEntity.ok("Login Successful");
    }

    // Handle registration requests
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        // Here, implement logic to save the user (e.g., in a database)
        System.out.println("Registered Username: " + user.getUsername());
        System.out.println("Registered Password: " + user.getPassword());

        // For now, return a success response
        return ResponseEntity.ok("Registration Successful");
    }
}
