package com.example.gidari.data;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;

import java.util.List;

@Dao
public interface UserDao {
    @Insert
    void insert(User user);

    @Query("SELECT * FROM Usuarios WHERE email = :email LIMIT 1")
    User findByEmail(String email);

    // Agrega otras consultas según tus necesidades
}