var divContenedorBotonesUsuario = document.getElementById("divBotones");
var divContenedorListaPosts = document.getElementById("div-contenedor-lista-posts");

consultarListaUsuarios(agregarBotones);

// Función que consulta la lista de users con AJAX y llama al callback agregarBotones
function consultarListaUsuarios(cbResponse) {
    var request = new XMLHttpRequest();    
    request.onreadystatechange = function() {
        var objUsuarios;
        if (this.readyState == 4 && this.status == 200) {
            objUsuarios = JSON.parse(request.responseText);
            cbResponse(objUsuarios);
        }
        console.log(objUsuarios)
    }

    request.open('GET','https://jsonplaceholder.typicode.com/users');
    request.send();
}


// Función callback que agrega botones con clase al div contenedor
function agregarBotones(listaUsuarios) {
    if (listaUsuarios) {
        for (let i = 0; i < listaUsuarios.length; i++) {
            let boton = document.createElement("button");
            boton.setAttribute("class", "boton-usuario");
            boton.appendChild(document.createTextNode(listaUsuarios[i].name));
            divContenedorBotonesUsuario.appendChild(boton);

            boton.addEventListener("click", function() {
                var userId = listaUsuarios[i].id;
                consultarListaPostsUsuario(userId, verPostsUsuario)
            });
        }
    console.log("DECIME QUE FUNCIONA")
    }
}

// Función que consulta la lista de posts de cada user con AJAX
function consultarListaPostsUsuario(userId, cbResponsePosts) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var objPosts = JSON.parse(request.responseText);
            cbResponsePosts(objPosts)
        }
        console.log(objPosts)
    }
    request.open('GET','https://jsonplaceholder.typicode.com/posts?userId=' + userId);
    request.send();
}

// Función callback que muestra los posts del user seleccionado
function verPostsUsuario(listaPostsUsuario) {
    divContenedorListaPosts.innerHTML = "";
    for (let i = 0; i < listaPostsUsuario.length; i++) {
        var parrafo = document.createElement("p");
        var titulo = document.createTextNode(listaPostsUsuario[i].title)
        parrafo.appendChild(titulo);
        parrafo.setAttribute("class", "titulo");
        divContenedorListaPosts.appendChild(parrafo);

        parrafo.addEventListener("click", function() {
            divContenedorListaPosts.innerHTML = "";
            var nuevoParrafo = document.createElement("p");
            var post = document.createTextNode(listaPostsUsuario[i].body)
            nuevoParrafo.appendChild(post);
            nuevoParrafo.setAttribute("class", "post");
            divContenedorListaPosts.appendChild(nuevoParrafo);
            console.log(post)
        })

        parrafo.addEventListener("click", function() {
            var postId = objComentarios[i].id;
            consultaComentarios(postId)
        
        })
    }
    
    console.log("Se supone que se ven los posts?")
}

// Función que consulta comentarios
function consultaComentarios(postId) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var objComentarios = JSON.parse(request.responseText);
            
            for (let i = 0; i < objComentarios.length; i++) {
                var nuevoParrafoComment = document.createElement("p");
                var comment = document.createTextNode(objComentarios[i].body)
                nuevoParrafo.appendChild(comment);
                nuevoParrafo.setAttribute("class", "comment");
                divContenedorListaPosts.appendChild(nuevoParrafoComment);
            }
        }
    }

    request.open('GET', 'https://jsonplaceholder.typicode.com/comments?postId=' + postId);
    request.send()
}

// Función que muestra body del post y comentarios


/*
// Función que muestra el post completo con comentarios
function verPostCompleto(listaPostsUsuario) {
    divContenedorListaPosts.innerHTML = "";
    for (let i = 0; i < listaPostsUsuario.length; i++) {
        //var postId = listaPostsUsuario[i].id;
        var nuevoParrafo = document.createElement("p");
        var post = document.createTextNode(listaPostsUsuario[i].body)
        nuevoParrafo.appendChild(post);
        nuevoParrafo.setAttribute("class", "post");
        divContenedorListaPosts.appendChild(nuevoParrafo);
    }
}
*/



