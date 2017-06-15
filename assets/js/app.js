var api = {
      url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
    };

var $listaTemas = $("#lista-temas");


var cargarPagina = function () {
      cargarTemas();
      $("#add-form").submit(agregarTema);
};


var cargarTemas = function () {
      $.getJSON(api.url, function (temas) {
        temas.forEach(crearTema);
      });
}


var crearTema = function (tema) {
    var autor = tema.author_name;
    var contenido = tema.content;
    var respuestas = tema.responses_count; 
    var id = tema._id; 
    
    // creamos la fila
    var $tr = $("<tr />");
    $tr.attr("data-id", id); 
    // creamos la celda del nombre
    var $temaTd = $("<td />");
    $temaTd.text(contenido);
    // creamos la celda del autor
    var $autorTd = $("<td />");
    $autorTd.text(autor);
    // creamos la celda de las respuestas
    var $respuestas = $("<td />"); 
    $respuestas.html(respuestas);
    // agregamos las celdas a la fila
    $tr.append($temaTd);
    $tr.append($autorTd);
    $tr.append($respuestas);
    // agregamos filas a la tabla
    $listaTemas.append($tr);
};


var agregarTema= function (e) {
    e.preventDefault();
    var autor = $("#nombre-autor").val();
    var contenido = $("#contenido-tema").val(); 
    $.post(api.url, {
        author_name: autor,
        content: contenido
    }, function (tema) {
        crearTema(tema);
        $("#myModal").modal("hide");
        });
};

$(document).ready(cargarPagina);