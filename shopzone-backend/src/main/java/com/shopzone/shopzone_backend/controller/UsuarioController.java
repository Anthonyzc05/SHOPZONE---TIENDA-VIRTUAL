package com.shopzone.shopzone_backend.controller;

import com.shopzone.shopzone_backend.model.Usuario;
import com.shopzone.shopzone_backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    //  Registrar usuario
    @PostMapping("/register")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
        Usuario existente = usuarioRepository.findByEmail(usuario.getEmail());

        if (existente != null) {
            return ResponseEntity.status(400).body("El usuario ya existe");
        }

        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Usuario registrado correctamente");
    }

    //  Iniciar sesión con validación correcta
    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody Usuario usuario) {
        Usuario user = usuarioRepository.findByEmail(usuario.getEmail());

        if (user == null) {
            return ResponseEntity.status(401).body("El usuario no está registrado");
        }

        if (!user.getPassword().equals(usuario.getPassword())) {
            return ResponseEntity.status(401).body("Contraseña incorrecta");
        }

        return ResponseEntity.ok("Inicio de sesión exitoso");
    }

    @GetMapping("/test")
    public String test() {
        return "Backend funcionando correctamente";
    }
}






