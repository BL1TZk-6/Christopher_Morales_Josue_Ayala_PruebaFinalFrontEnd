import {
  obtenerPremios,
  createPremio,
  actualizarpremio,
  eliminarpremio
} from "../Service/PremiosService.js";

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#itemsTable tbody");
  const form = document.getElementById("itemForm");
  const modal = new bootstrap.Modal(document.getElementById("itemModal"));
  const modalLabel = document.getElementById("itemModalLabel");
  const btnAdd = document.getElementById("btnAdd");

  // --- Botón agregar ---
  btnAdd.addEventListener("click", () => {
    limpiarFormulario();
    modalLabel.textContent = "Agregar Premio";
    modal.show();
  });

  // --- Envío del formulario ---
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = form.itemId.value;

    const payload = {
      nombre: form.itemName.value.trim(),
      categoria: form.itemCategory.value.trim(),
      anioPremio: Number(form.itemYear.value),
      resultado: form.itemResult.value.trim(),
      fechaRegistro: form.fecha_registro.value,
      peliculaId: Number(form.id2.value) || null,
    };

    try {
      if (id) {
        await actualizarpremio(id, payload);
      } else {
        await createPremio(payload);
      }

      modal.hide();
      await cargarPremios();
    } catch (err) {
      console.error("Error guardando el premio:", err);
      alert("Ocurrió un error al guardar el premio.");
    }
  });

  // --- Cargar premios ---
  async function cargarPremios() {
    try {
      const premios = await obtenerPremios();
      tableBody.innerHTML = "";

      if (!premios || premios.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td class="text-center text-muted" colspan="6">
              Actualmente no hay registros
            </td>
          </tr>
        `;
        return;
      }

      premios.forEach((item) => {
        const tr = document.createElement("tr");

        // ID
        const tdId = document.createElement("td");
        tdId.textContent = item.idPremio || item.id;
        tr.appendChild(tdId);

        // Nombre
        const tdNombre = document.createElement("td");
        tdNombre.textContent = item.nombre;
        tr.appendChild(tdNombre);

        // Categoría
        const tdCategoria = document.createElement("td");
        tdCategoria.textContent = item.categoria;
        tr.appendChild(tdCategoria);

        // Año Premio
        const tdAnio = document.createElement("td");
        tdAnio.textContent = item.anioPremio;
        tr.appendChild(tdAnio);

        // Resultado
        const tdResultado = document.createElement("td");
        tdResultado.textContent = item.resultado;
        tr.appendChild(tdResultado);

        // Fecha Registro
        const tdFecha = document.createElement("td");
        tdFecha.textContent = item.fechaRegistro;
        tr.appendChild(tdFecha);

        // Botones
        const tdBtns = document.createElement("td");

        const btnEdit = document.createElement("button");
        btnEdit.className = "btn btn-sm btn-outline-secondary me-1";
        btnEdit.title = "Editar";
        btnEdit.innerHTML = `<i class="bi bi-pencil"></i>`;
        btnEdit.addEventListener("click", () => setFormulario(item));
        tdBtns.appendChild(btnEdit);

        const btnDel = document.createElement("button");
        btnDel.className = "btn btn-sm btn-outline-danger";
        btnDel.title = "Eliminar";
        btnDel.innerHTML = `<i class="bi bi-trash"></i>`;
        btnDel.addEventListener("click", () => {
          if (confirm("¿Eliminar este premio?")) {
            eliminarPremio(item.idPremio || item.id);
          }
        });
        tdBtns.appendChild(btnDel);

        tr.appendChild(tdBtns);
        tableBody.appendChild(tr);
      });
    } catch (err) {
      console.error("Error cargando premios:", err);
    }
  }

  // --- Rellenar formulario (editar) ---
  function setFormulario(item) {
    form.itemId.value = item.idPremio || item.id;
    form.itemName.value = item.nombre;
    form.itemCategory.value = item.categoria;
    form.itemYear.value = item.anioPremio;
    form.itemResult.value = item.resultado;
    form.fecha_registro.value = item.fechaRegistro;
    form.id2.value = item.peliculaId || "";

    modalLabel.textContent = "Editar Premio";
    modal.show();
  }

  // --- Limpiar formulario ---
  function limpiarFormulario() {
    form.reset();
    form.itemId.value = "";
    form.id2.value = "";
  }

  // --- Eliminar premio ---
  async function eliminarPremio(id) {
    try {
      await eliminarpremio(id);
      await cargarPremios();
    } catch (err) {
      console.error("Error al eliminar premio:", err);
      alert("No se pudo eliminar el premio.");
    }
  }

  // --- Carga inicial ---
  cargarPremios();
});