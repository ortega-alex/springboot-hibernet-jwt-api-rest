package com.cursojava.curso.controllers;

import com.cursojava.curso.dao.UsuarioDao;
import com.cursojava.curso.models.Usuario;
import com.cursojava.curso.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/usuarios", method = RequestMethod.GET)
    public List<Usuario> getUsuarios(@RequestHeader(value = "Authorization") String token) {
        if (!validarToken(token)) { return null;}
        return usuarioDao.getUsuarios();
    }

    @RequestMapping(value = "api/usuario/{id}", method = RequestMethod.DELETE)
    public void eliminar(
        @PathVariable Long id,
        @RequestHeader(value = "Authorization") String token
    ) {
        if (!validarToken(token)) { return; }
        usuarioDao.eliminar(id);
    }

    @RequestMapping(value = "api/usuario", method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody Usuario usuario) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hast = argon2.hash(1, 1024, 1, usuario.getPassword());
        usuario.setPassword(hast);
        usuarioDao.registrar(usuario);
    }

    private boolean validarToken(String token) {
        String usuarioId = jwtUtil.getKey(token);
         return usuarioId != null;
    }
}
