// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarUsuarios();
    $('#usuarios').DataTable();
    actualizarEmailUsuario();
});

function actualizarEmailUsuario() {
    document.getElementById('email-usuario').outerHTML = localStorage.email;
}

async function cargarUsuarios() {
     const request = await fetch('api/usuarios', {
        method: 'GET',
        headers: getHeader()
     });
     const usuarios = await request.json();
    let listadoHtml = ``;
    for (let usuario of usuarios) {
          listadoHtml += `  <tr>
                                <td>${usuario.id}</td>
                                <td>${usuario.nombre} ${usuario.apellido}</td>
                                <td>${usuario.email}</td>
                                <td>${usuario.telefono}</td>
                                <td>
                                    <a
                                        href="#"
                                        class="btn btn-danger btn-circle"
                                        onclick="eliminarUsuario(${usuario.id})"
                                    >
                                        <i class="fas fa-trash"></i>
                                    </a>
                                </td>
                            </tr>`;
    }
    document.querySelector('#usuarios tbody').outerHTML = listadoHtml;
}

async function eliminarUsuario(id) {
    if (confirm('Desea eliminar este usuario?')) {
         const request = await fetch('api/usuario/' + id, {
            method: 'DELETE',
            headers: getHeader()
        });
        location.reload();
    }
}

function getHeader() {
    return {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': localStorage.token
    };
}

