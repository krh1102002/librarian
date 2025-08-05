package com.hackathon_ai.LibraryManagementBackend.repository;
import com.hackathon_ai.LibraryManagementBackend.entites.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    boolean existsByEmail(String name);

    List<User> findByCreatedAtGreaterThanEqual(LocalDateTime oneMonthAgo);
}