var data;
async function cargarProductosPorBodega(token) {
  try {
    const response = await fetch("/api/dashboard-info-bodega", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data })
    });

    console.log(data);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const data_res = await response.json();
    const lista = data_res.stockPorBodega;

    const contenedor = document.getElementById("productos-bodega");
    contenedor.innerHTML = ""; // Limpia contenido previo

    lista.forEach(item => {
      const article = document.createElement("article");
      article.classList.add("card");

      article.innerHTML = `
        <h3>${item.bodega}</h3>
        <p class="count">${item.total_stock} productos</p>
        <h5 class="ciudad">${item.ciudad}</h5>
        <button class="btn-ver-productos" data-id="${item.id}">Ver productos</button>
      `;

      contenedor.appendChild(article);
    });

    // 👉 Aquí viene la parte corregida
    document.querySelectorAll(".btn-ver-productos").forEach(btn => {
      btn.addEventListener("click", () => {

        // 1. Quitar "activo" de TODAS las cards
        document.querySelectorAll(".card")
          .forEach(card => card.classList.remove("activo"));

        // 2. Obtener la CARD padre del botón clickeado
        const card = btn.closest(".card");

        // 3. Activar SOLO esa card
        card.classList.add("activo");

        // 4. Cargar los productos de esa bodega
        const idBodega = btn.getAttribute("data-id");
        cargarProductosDeBodega(idBodega, token);
      });
    });

  } catch (error) {
    console.error("No se pudo cargar la información:", error);
  }
}


async function cargarProductosDeBodega(bodegaId, token) {
  try {
    const response = await fetch(`/api/bodega/${bodegaId}/productos`, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data })
    });

    if (!response.ok) {
      throw new Error("Error al obtener productos de la bodega");
    }

    const data_res = await response.json();
    const tbody = document.getElementById("tbody-productos-bodega");

    tbody.innerHTML = "";

    data_res.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.id}</td>
        <td>${item.nombre}</td>
        <td>${item.stock}</td>
      `;
      tbody.appendChild(tr);
    });

  } catch (error) {
    console.error("Error:", error);
  }
}

async function cargarProductos(token) {
  alert("cargarProductos");
}

async function cargarEntradas(token) {
  alert("cargarEntradas");
}

async function cargarSalidas(token) {
  alert("cargarSalidas");
}

async function cargarTransferencias(token) {
  alert("cargarTransferencias");
}

// Navegación y ejecución según sección
function iniciarNavegacion() {
  const links = document.querySelectorAll('#sidebar nav a');
  const secciones = document.querySelectorAll('main > section');

  // Mostrar solo bodegas al inicio
  secciones.forEach(sec => sec.classList.add("oculto"));
  document.getElementById("sec-bodegas").classList.remove("oculto");

  links.forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();

      const destino = link.getAttribute("href");
      const seccion = document.getElementById(destino);

      if (!seccion) return;

      // Ocultar todas las secciones
      secciones.forEach(sec => sec.classList.add("oculto"));

      // Mostrar la sección seleccionada
      seccion.classList.remove("oculto");

      // Actualizar menú activo
      links.forEach(l => l.parentElement.classList.remove("activo_menu"));
      link.parentElement.classList.add("activo_menu");

      // Ejecutar la función correspondiente
      const token = sessionStorage.getItem("token");
      switch (destino) {
        case "sec-bodegas":
          await cargarProductosPorBodega(token);
          break;
        case "sec-productos":
          await cargarProductos(token);
          break;
        case "sec-entradas":
          await cargarEntradas(token);
          break;
        case "sec-salidas":
          await cargarSalidas(token);
          break;
        case "sec-Transferencia":
          await cargarTransferencias(token);
          break;
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return window.location.href = "/login";
  }

  document.getElementById("btn-cerrar-sesion").addEventListener("click", () => {
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  })

  try {
    const res = await fetch("/api/dashboard-data", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data })
    });

    if (!res.ok) throw new Error("No autorizado");

    data = await res.json();
    console.log(data);

    document.getElementById("username").innerText = data.nombre;
    document.getElementById("rol").innerText = data.rol;

  } catch (e) {
    console.log(e);
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  }
  iniciarNavegacion();
  await cargarProductosPorBodega(token);
});
