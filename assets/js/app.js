var api = {
      url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/'
    };

var $listaTemas = $("#lista-temas");


var cargarPagina = function () {
      cargarTemas();
      $("#add-form").submit(agregarTema);
      $("#barra-buscar").keyup(filtrarTemas);
      mostrarDetalles();
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
    var id = tema.id; 
    
    // creamos la fila
    var $tr = $("<tr />");
    // creamos la celda del nombre
    var $temaTd = $("<td />");
    $temaTd.text(contenido);
    $temaTd.attr("data-id", id); 
    //celda mostrar detalles 
    var $detalle = $("<td />"); 
    $detalle.html(plantillaMostrar);
    // creamos la celda del autor
    var $autorTd = $("<td />");
    $autorTd.text(autor);
    // creamos la celda de las respuestas
    var $respuestas = $("<td />"); 
    $respuestas.html(respuestas);
    // agregamos las celdas a la fila
    $tr.append($temaTd);
    $tr.append($detalle);
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


var arregloTemas = [];

$.getJSON(api.url, function (temas) { 
    temas.forEach(function(tema){ 
        arregloTemas.push(tema) 
    })}); 

console.log(arregloTemas); 


// EN LA CONSOLA OBTIENE ELEMENTOS, PERO AGREGA CELDAS POR EL APPEND. 
var filtrarTemas = function (e) { 
	e.preventDefault();
	var temaABuscar = $("#barra-buscar").val().toLowerCase();
	var temasFiltrados = arregloTemas.filter(function (tema) {
		return tema.content.toLowerCase().indexOf(temaABuscar) >= 0;
	});
	crearTema(temasFiltrados);
};

var mostrarDetalles = function () {
     
     $(document).on("click", ".mostrar", function () { 
         $.getJSON(api.url, function (textos) {
          var contenido = textos.content;
            console.log(contenido);
          $("#contenido").text("Nombre: " +contenido);
           
      });
   });
 }

var plantillaMostrar = '<button data-toggle="modal" data-target=".bs-example-modal-sm" class="mostrar"><span        class="glyphicon glyphicon-user"></span></button>'; 


$(document).ready(cargarPagina);