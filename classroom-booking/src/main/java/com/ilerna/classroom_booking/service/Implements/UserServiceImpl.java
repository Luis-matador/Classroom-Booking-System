package com.ilerna.classroom_booking.service.Implements;

import com.ilerna.classroom_booking.model.User;
import com.ilerna.classroom_booking.repository.UserRepository;
import com.ilerna.classroom_booking.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    @Override
    public User saveUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("El email ya existe");
        }

        if (user.getRol() == null || user.getRol().getId() == null) {
            throw new IllegalArgumentException("Rol no encontrado");
        }

        return userRepository.save(user);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }


    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    @Override
    public User updateUser(Long id, User user) {
        User existingUser = getUserById(id).orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con id: " + id));

        existingUser.setName(user.getName());
        existingUser.setLastName(user.getLastName());
        existingUser.setEmail(user.getEmail());
        existingUser.setRol(user.getRol());

        return userRepository.save(existingUser);
    }

    @Transactional
    @Override
    public void deleteUserById(Long id) {
        User user = getUserById(id).orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con id: " + id));
        userRepository.delete(user);
    }
}