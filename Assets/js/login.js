const correoLogin = document.querySelector("#correoLogin");
const claveLogin = document.querySelector("#claveLogin");

// login directo
login.addEventListener("click", function () {
  if (correoLogin.value == "" || claveLogin.value == "") {
    Swal.fire("Aviso?", "TODO LOS CAMPOS SON REQUERIDOS", "warning");
  } else {
    let formData = new FormData();
    formData.append("correoLogin", correoLogin.value);
    formData.append("claveLogin", claveLogin.value);
    const url = base_url + "Usuarios/loginDirecto";
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.send(formData);
    http.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const res = JSON.parse(this.responseText);
        Swal.fire("Aviso?", res.msg, res.icono);
        if (res.icono == "success") {
          setTimeout(() => {
            window.location = base_url + "Usuarios";
            initDataTable(); // Inicializar DataTables al redirigir
          }, 3000);
        }
      }
    };
  }
});
