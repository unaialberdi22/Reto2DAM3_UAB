package com.example.gidari.data;

import java.util.Map;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface ApiService {
    @POST("registro")
    Call<Void> registerUser(@Body User user);

    @POST("login")
    Call<Void> authenticateUser(@Body Map<String, String> credentials);

    // Agrega otras llamadas según tus necesidades
}