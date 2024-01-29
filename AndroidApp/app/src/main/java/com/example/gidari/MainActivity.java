package com.example.gidari;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

import com.example.gidari.data.ApiService;
import com.example.gidari.data.AppDatabase;
import com.example.gidari.data.User;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {
    private EditText editTextUsername, editTextEmail, editTextPassword;
    private Button buttonRegister;

    private AppDatabase appDatabase;
    private ApiService apiService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        // Inicializa los elementos de la interfaz de usuario
        editTextUsername = findViewById(R.id.editTextUsername);
        editTextEmail = findViewById(R.id.editTextEmail);
        editTextPassword = findViewById(R.id.editTextPassword);
        buttonRegister = findViewById(R.id.buttonRegister);

        // Configura la base de datos Room
        appDatabase = AppDatabase.getInstance(this);

        // Configura Retrofit
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://10.10.12.205:3000/api/v1/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        // Crea una instancia de ApiService
        apiService = retrofit.create(ApiService.class);

        // Configura el listener para el botón de registro
        buttonRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Obtiene los datos del usuario desde los campos de texto
                String username = editTextUsername.getText().toString();
                String email = editTextEmail.getText().toString();
                String password = editTextPassword.getText().toString();

                // Crea un objeto User con los datos del usuario
                User newUser = new User();
                newUser.username = username;
                newUser.email = email;
                newUser.password = password;

                // Inserta el usuario en la base de datos y realiza la llamada a la API para registrar al usuario
                registerUser(newUser);
            }
        });
    }

    private void registerUser(User user) {
        // Realiza la inserción del usuario en la base de datos usando Room
        new Thread(() -> {
            appDatabase.userDao().insert(user);
            runOnUiThread(() -> Toast.makeText(MainActivity.this, "Usuario registrado localmente", Toast.LENGTH_SHORT).show());

            // Realiza la llamada a la API usando Retrofit
            Call<Void> registerCall = apiService.registerUser(user);

            registerCall.enqueue(new Callback<Void>() {
                @Override
                public void onResponse(Call<Void> call, Response<Void> response) {
                    if (response.isSuccessful()) {
                        // Usuario registrado con éxito
                        runOnUiThread(() -> Toast.makeText(MainActivity.this, "Usuario registrado en la API", Toast.LENGTH_SHORT).show());
                    } else {
                        // Manejar errores en el registro en la API
                        runOnUiThread(() -> Toast.makeText(MainActivity.this, "Error al registrar el usuario en la API", Toast.LENGTH_SHORT).show());
                    }
                }

                @Override
                public void onFailure(Call<Void> call, Throwable t) {
                    // Manejar error de red al registrar el usuario en la API
                    runOnUiThread(() -> Toast.makeText(MainActivity.this, "Error de red al registrar el usuario en la API", Toast.LENGTH_SHORT).show());
                }
            });
        }).start();
    }
}