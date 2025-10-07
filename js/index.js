
    document.addEventListener("DOMContentLoaded", function() {
      const fechaInput = document.getElementById("fecha_registro");
      const ahora = new Date();
      const año = ahora.getFullYear();
      const mes = ('0' + (ahora.getMonth() + 1)).slice(-2); 
      const dia = ('0' + ahora.getDate()).slice(-2);
      fechaInput.value = `${año}-${mes}-${dia}`;
    });