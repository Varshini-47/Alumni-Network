package com.example.alumni.service;

import com.example.alumni.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AdminService implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Override
    public void run(String... args) throws Exception {
        User user = new User();
        user.setName("ADMIN");
        user.setRollNo("NITC");
        user.setEmail("admin@gmail.com");
        user.setPassword("admin"); // The password will be encrypted inside registerUser()
        user.setRole("admin");

        String response = userService.registerUser(user);
        System.out.println(response);
    }
}
