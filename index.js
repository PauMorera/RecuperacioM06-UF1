document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('cookieForm').onsubmit = function(e) {
      e.preventDefault();
      crearCookie();
  }

  refreshCookies();
});
function crearCookie() {
  var nom = document.getElementById('nom').value;
  var valor = document.getElementById('valor').value;
  var expiracio = new Date(document.getElementById('expiracio').value);
  document.cookie = nom + "=" + valor + "; expires=" + expiracio.toUTCString() + "; path=/";
  refreshCookies();
}
function refreshCookies() {
  var cookies = document.cookie.split('; ');
  var cookiesContainer = document.getElementById('cookiesContainer');
  cookiesContainer.innerHTML = '';
  for(var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].split('=');
      displayCookie(cookie[0], cookie[1]);
  }
}

function displayCookie(nom, valor) {
  var cookiesContainer = document.getElementById('cookiesContainer');
  cookiesContainer.innerHTML += `
      <div>
          <h3>${nom}</h3>
          Valor: ${valor} 
          <button onclick="modifyCookie('${nom}')">Modificar</button> 
          <button onclick="deleteCookie('${nom}')">Eliminar</button>
      </div>
  `;
}