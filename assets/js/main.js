$(function () {

    //validar
$("#formBusqueda").submit(function () {
  event.preventDefault();

  let numeroHeroe = $("#numeroSuperhero").val();
  let regex = /^[1-9][0-9]{0,2}$/; // Regex para números entre 1 y 999

  if (!regex.test(numeroHeroe) || numeroHeroe < 1 || numeroHeroe > 732) {
    if (isNaN(numeroHeroe)) {
      alert("Por favor, solo un número entre 1 y 732. No letras, no intentes buscar tu superheroe por su nombre :)");
    } else {
      alert("Por favor, ingresa un número entre 1 y 732.");
    }
    return;
  }

  buscarSuperHeroe(numeroHeroe);
});

});

//fx para mostrar estadisticas en grafico
function mostrarEstadisticas(data) {
  let graficoPastel = new CanvasJS.Chart("chartContainer", {
    theme: "dark1",
    data: [
      {
        type: "pie",
        showInLegend: true,
        legendText: "{label}", // se agrega el label para mostrar como indicadores debajo del grafico
        toolTipContent: "{label}: <strong>{y}%</strong>",
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: +data.powerstats.intelligence, label: "Inteligencia" },
          { y: +data.powerstats.strength, label: "Fuerza" },
          { y: +data.powerstats.speed, label: "Velocidad" },
          { y: +data.powerstats.durability, label: "Durabilidad" },
          { y: +data.powerstats.power, label: "Poder" },
          { y: +data.powerstats.combat, label: "Combate" },
        ],
      },
    ],
  });
  graficoPastel.render();
}

function buscarSuperHeroe(numeroHeroe) {
  $.ajax({
    url: "https://www.superheroapi.com/api.php/3525635500807579/" + numeroHeroe,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      // fx apis
      $("#pfp").attr("src", data.image.url);
      $("#name").text("Nombre: " + data.name);
      $("#publicadoPor").text("Publicado por: " + data.biography.publisher);
      $("#ocupacion").text("Ocupacion: " + data.work.occupation);
      $("#primeraAparicion").text(
        "Primera aparicion: " + data.biography["first-appearance"]
      );
      $("#lugarDeNacimiento").text(
        "Lugar de Nacimiento: " + data.biography["place-of-birth"]
      );
      $("#altura").text("Altura: " + data.appearance.height.join(" | "));
      $("#peso").text("Peso: " + data.appearance.weight.join(" | "));
      $("#alianzas").text("Alianzas: " + data.connections["group-affiliation"]);
      $("#parientes").text("Parientes: " + data.connections["relatives"]);

      $("#tituloCard").text("Has seleccinado a: " + data.name);
      $("#tituloGrafico").text("Estadisticas de: " + data.name);

      $("#superHeroEncontrado").show();
      mostrarEstadisticas(data);
    },
    error: function (error) {
      console.log(error);
    },
  });
}
