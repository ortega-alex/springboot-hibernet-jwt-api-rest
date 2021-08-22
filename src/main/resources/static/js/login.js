$(document).ready(function() {
   // on readry
});

async function iniciarSesion() {
    event.preventDefault();
    let datos = {
        'email': document.getElementById('email').value,
        'password': document.getElementById('password').value
    }

     const request = await fetch('api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
     });
     const respuesta = await request.text();
     if (respuesta !== 'FAIL') {
        localStorage.token = respuesta;
        localStorage.email = datos.email;
        window.location.href = 'usuarios.html';
     } else {
        alert("las credenciales son incorrectas. por favor intente nuevamente");
     }
}