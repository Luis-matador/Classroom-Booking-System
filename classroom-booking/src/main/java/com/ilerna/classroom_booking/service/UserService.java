package com.ilerna.classroom_booking.service;

import com.ilerna.classroom_booking.model.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);
    User findByEmail(String email);
    User getUserById(Long id);
    List<User> getAllUsers();
    User updateUser(Long id, User user);
    void deleteUserById(Long id);
}
