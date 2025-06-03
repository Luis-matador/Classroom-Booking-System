package com.ilerna.classroom_booking.repository;

import com.ilerna.classroom_booking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
