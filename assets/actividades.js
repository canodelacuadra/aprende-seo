/* ==========================================================================
   Actividades SEO · IFCD0210
   Comportamientos comunes: copiar código, checklist persistente, índice activo
   ========================================================================== */

(function () {
  "use strict";

  var CLAVE_CHECKLIST = "actividades-seo:checklist:v1";

  /* ------------------------------------------------------------------------
     Utilidades
     ------------------------------------------------------------------------ */

  function leerChecklist() {
    try {
      var datos = window.localStorage.getItem(CLAVE_CHECKLIST);
      return datos ? JSON.parse(datos) : {};
    } catch (error) {
      return {};
    }
  }

  function guardarChecklist(datos) {
    try {
      window.localStorage.setItem(CLAVE_CHECKLIST, JSON.stringify(datos));
    } catch (error) {
      /* Si el navegador bloquea localStorage, la checklist sigue funcionando
         durante la sesión, pero no se recuerda al recargar. */
    }
  }

  function copiarTexto(texto) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(texto);
    }

    return new Promise(function (resolve, reject) {
      var area = document.createElement("textarea");
      area.value = texto;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.top = "-9999px";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();

      try {
        var correcto = document.execCommand("copy");
        document.body.removeChild(area);
        correcto ? resolve() : reject(new Error("No se pudo copiar"));
      } catch (error) {
        document.body.removeChild(area);
        reject(error);
      }
    });
  }

  /* ------------------------------------------------------------------------
     Botones de copiar código
     ------------------------------------------------------------------------ */

  function prepararBloquesDeCodigo() {
    var bloques = document.querySelectorAll(".codigo");

    Array.prototype.forEach.call(bloques, function (bloque) {
      var pre = bloque.querySelector("pre");
      if (!pre) {
        return;
      }

      var cabecera = bloque.querySelector(".codigo-cabecera");
      if (!cabecera) {
        cabecera = document.createElement("div");
        cabecera.className = "codigo-cabecera";
        bloque.insertBefore(cabecera, pre);
      }

      if (!cabecera.querySelector(".codigo-lenguaje")) {
        var lenguaje = document.createElement("span");
        lenguaje.className = "codigo-lenguaje";
        lenguaje.textContent = bloque.getAttribute("data-lenguaje") || "Código";
        cabecera.appendChild(lenguaje);
      }

      if (cabecera.querySelector(".boton-copiar")) {
        return;
      }

      var boton = document.createElement("button");
      boton.type = "button";
      boton.className = "boton-copiar";
      boton.textContent = "Copiar";

      boton.addEventListener("click", function () {
        var codigo = pre.innerText;

        copiarTexto(codigo)
          .then(function () {
            boton.textContent = "Copiado";
            boton.classList.add("copiado");
            window.setTimeout(function () {
              boton.textContent = "Copiar";
              boton.classList.remove("copiado");
            }, 1800);
          })
          .catch(function () {
            boton.textContent = "No se pudo copiar";
            window.setTimeout(function () {
              boton.textContent = "Copiar";
            }, 2200);
          });
      });

      cabecera.appendChild(boton);
    });
  }

  /* ------------------------------------------------------------------------
     Checklist con persistencia
     ------------------------------------------------------------------------ */

  function actualizarProgreso(panel) {
    var casillas = panel.querySelectorAll('input[type="checkbox"][data-check]');
    var total = casillas.length;
    var marcadas = 0;

    Array.prototype.forEach.call(casillas, function (casilla) {
      if (casilla.checked) {
        marcadas += 1;
      }
    });

    var relleno = panel.querySelector("[data-progreso-relleno]");
    var texto = panel.querySelector("[data-progreso-texto]");
    var porcentaje = total ? Math.round((marcadas / total) * 100) : 0;

    if (relleno) {
      relleno.style.width = porcentaje + "%";
    }

    if (texto) {
      texto.textContent = marcadas + " de " + total + " · " + porcentaje + "%";
    }
  }

  function prepararChecklists() {
    var paneles = document.querySelectorAll(".checklist-panel");
    if (!paneles.length) {
      return;
    }

    var guardado = leerChecklist();

    Array.prototype.forEach.call(paneles, function (panel) {
      var casillas = panel.querySelectorAll('input[type="checkbox"][data-check]');

      Array.prototype.forEach.call(casillas, function (casilla) {
        var id = casilla.getAttribute("data-check");
        if (id && guardado[id] === true) {
          casilla.checked = true;
        }

        casilla.addEventListener("change", function () {
          var datos = leerChecklist();
          if (casilla.checked) {
            datos[id] = true;
          } else {
            delete datos[id];
          }
          guardarChecklist(datos);
          actualizarProgreso(panel);
        });
      });

      var reiniciar = panel.querySelector("[data-reiniciar]");
      if (reiniciar) {
        reiniciar.addEventListener("click", function () {
          var datos = leerChecklist();

          Array.prototype.forEach.call(casillas, function (casilla) {
            casilla.checked = false;
            var id = casilla.getAttribute("data-check");
            if (id) {
              delete datos[id];
            }
          });

          guardarChecklist(datos);
          actualizarProgreso(panel);
        });
      }

      actualizarProgreso(panel);
    });
  }

  /* ------------------------------------------------------------------------
     Índice lateral activo
     ------------------------------------------------------------------------ */

  function prepararIndice() {
    var enlaces = document.querySelectorAll(".indice a[href^='#']");
    if (!enlaces.length || !("IntersectionObserver" in window)) {
      return;
    }

    var mapa = {};
    var secciones = [];

    Array.prototype.forEach.call(enlaces, function (enlace) {
      var id = enlace.getAttribute("href").slice(1);
      var seccion = document.getElementById(id);
      if (seccion) {
        mapa[id] = enlace;
        secciones.push(seccion);
      }
    });

    if (!secciones.length) {
      return;
    }

    var observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) {
            return;
          }

          Array.prototype.forEach.call(enlaces, function (enlace) {
            enlace.classList.remove("activo");
            enlace.removeAttribute("aria-current");
          });

          var enlaceActivo = mapa[entrada.target.id];
          if (enlaceActivo) {
            enlaceActivo.classList.add("activo");
            enlaceActivo.setAttribute("aria-current", "true");
          }
        });
      },
      {
        rootMargin: "-18% 0px -68% 0px",
        threshold: 0
      }
    );

    secciones.forEach(function (seccion) {
      observador.observe(seccion);
    });
  }

  /* ------------------------------------------------------------------------
     Botones de imprimir
     ------------------------------------------------------------------------ */

  function prepararImpresion() {
    var botones = document.querySelectorAll("[data-imprimir]");

    Array.prototype.forEach.call(botones, function (boton) {
      boton.addEventListener("click", function () {
        window.print();
      });
    });
  }

  /* ------------------------------------------------------------------------
     Arranque
     ------------------------------------------------------------------------ */

  function iniciar() {
    prepararBloquesDeCodigo();
    prepararChecklists();
    prepararIndice();
    prepararImpresion();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
