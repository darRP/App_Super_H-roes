  $(document).ready(function() {
      $('#buscador').keypress(function(e) {
          var keycode = (e.keyCode ? e.keyCode : e.which);
          if (keycode == '13') {
              var value = $(this).val().toLowerCase().trim();
              if (value != '') {
                  SearchHeroe(value);
              } else {
                  alert('Debe escribir el nombre del héroe y oprimir enter, evite vacíos');
              }


          }
      });

      function SearchHeroe(val) {
          $.ajax({
              url: "/getSuperHeroes?heroe=" + val,
              type: "GET",
              success: function(result) {
                  if (result.message == 'no se encontro héroe') {
                      alert(result.message);
                  } else {
                      $('#tablaHeroes').DataTable().destroy();
                      $('#tablaHeroes').DataTable({
                          responsive: true,
                          data: result,
                          "columns": [{
                              "data": "Heroe"
                          }, {
                              "data": "Nombre"
                          }, {
                              "data": "Bando"
                          }, {
                              "data": "intelligence"
                          }, {
                              "data": "strength"
                          }, {
                              "data": "speed"
                          }, {
                              "data": "durability"
                          }, {
                              "data": "power"
                          }, {
                              "data": "combat"
                          }]
                      });
                      return true;
                  }

              }
          });
      }
      SearchHeroe('batman');
  });