$(document).ready(function() {
   // on readry
});

async function registrarUsuarios() {
    event.preventDefault();
    let datos = {
        'nombre': document.getElementById('nombre').value,
        'apellido': document.getElementById('apellido').value,
        'email': document.getElementById('email').value,
        'telefono': document.getElementById('telefono').value,
        'password': document.getElementById('password').value
    }

    let repetir = document.getElementById('repet_password').value;
    if (datos.password !== repetir) {
        alert('La contraseña que escribiste es incorecta');
        return true;
    }

     const request = await fetch('api/usuario', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
     });
     alert("La cuenta fue creada con exito");
     window.location.href = 'registrar.html';
}


