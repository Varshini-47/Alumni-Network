package com.example.alumni.controller;

import com.example.alumni.model.User;
import com.example.alumni.repository.UserRepository;
import com.example.alumni.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        String result = userService.registerUser(user);
        if (result.equals("User registered successfully!")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user, HttpSession session) {
        Optional<User> loggedInUser = userService.loginUser(user.getEmail(), user.getPassword());

        if (loggedInUser.isPresent()) {
            session.setAttribute("user", loggedInUser.get());
            return ResponseEntity.ok(loggedInUser.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> payload, HttpSession session) {
        System.out.println("HEllo");
        String email = payload.get("email");
        String firstName = payload.get("firstName");
        String lastName = payload.get("lastName");

        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required");
        }

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            // If the user exists, add them to the session and return their details.
            User user = userOptional.get();
            session.setAttribute("user", user);
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("newUser", false);
            return ResponseEntity.ok(response);
        } else {
            // User not found: do not create a new record.
            // Return a response indicating the user is not registered.
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User not registered");
            response.put("newUser", true);
            return ResponseEntity.ok(response);
        }
    }

    @GetMapping("/user-info")
    public ResponseEntity<?> getUserInfo(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }
    }

    @PostMapping("/complete-profile")
    public ResponseEntity<?> completeProfile(@RequestBody Map<String, String> payload, HttpSession session) {
        System.out.println("In profile");
        User sessionUser = (User) session.getAttribute("user");
        System.out.println("In compprofile");
        System.out.println(sessionUser);
        if (sessionUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }

        String firstName = payload.get("firstName");
        String lastName = payload.get("lastName");
        String batch = payload.get("batch");
        String rollNo = payload.get("rollNo");
        String password = payload.get("password");
        String phoneno = payload.get("phoneno");
        String department = payload.get("department");
        String imageUrl = payload.get("uploadedImageUrl");

        Optional<User> userOptional = userRepository.findByEmail(sessionUser.getEmail());
        User user;

        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            user = new User();
            user.setEmail(sessionUser.getEmail());
        }

        user.setName(firstName);
        user.setLastName(lastName);
        user.setBatch(batch);
        user.setRollNo(rollNo);
        user.setRole("ALUMNI");
        user.setPhone(phoneno);
        user.setPassword(passwordEncoder.encode(password));
        user.setDepartment(
                department);
        user.setImageUrl(imageUrl);
        userRepository.save(user);

        session.setAttribute("user", user);

        return ResponseEntity.ok("Profile completed successfully!");
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers()
                .stream()
                .filter(user -> !"admin".equalsIgnoreCase(user.getRole())) 
                .collect(Collectors.toList());
    }

    @PutMapping("/users/{id}/updateProfile")
    public ResponseEntity<String> updateUserProfile(@PathVariable Long id, @RequestBody User updatedUser) {
        System.out.println("\n\nEntered update profile\n\n");
        userService.updateUserProfile(id, updatedUser);
        return ResponseEntity.ok("Profile updated successfully!");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully");
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        boolean isDeleted = userService.deleteUserById(id);
        return isDeleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
