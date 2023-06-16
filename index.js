document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('cookieForm').onsubmit = function(e) {
      e.preventDefault();
      crearCookie();
  }

  refreshCookies();
});

function crearCookie() {
  let nom = document.getElementById('nom').value;
  let valor = document.getElementById('valor').value;
  let expiracio = new Date(document.getElementById('expiracio').value);
  document.cookie = nom + "=" + valor + "; expires=" + expiracio.toUTCString() + "; path=/";
  refreshCookies();
}

function refreshCookies() {
  let cookies = document.cookie.split('; ');
  let cookiesContainer = document.getElementById('cookiesContainer');
  cookiesContainer.innerHTML = '';
  for(let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].split('=');
      displayCookie(cookie[0], cookie[1]);
  }
}

function displayCookie(nom, valor) {
  let cookiesContainer = document.getElementById('cookiesContainer');
  let normalizedNom = nom.replace(/[^A-Za-z0-9]/g, '');
  cookiesContainer.innerHTML += `
      <div id="${normalizedNom}">
          <h3>${nom}</h3>
          Valor: <span id="${normalizedNom}Valor">${valor}</span>
          <button onclick="modifyCookieValor('${normalizedNom}')">Modificar Valor</button> 
          <button onclick="modifyCookieExpiry('${normalizedNom}')">Modificar Expiració</button> 
          <button onclick="deleteCookie('${nom}')">Eliminar</button>
      </div>
  `;
}

window.deleteCookie = function(nom) {
  document.cookie = nom + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  refreshCookies();
}

window.modifyCookieValor = function(normalizedNom) {
  var nuevoValor = prompt("Introduce el nuevo valor para la cookie " + normalizedNom);
  if(nuevoValor) {
    var expiracion = getCookieExpiry(normalizedNom);
    document.cookie = normalizedNom + "=" + nuevoValor + "; expires=" + expiracion + "; path=/";
    refreshCookies();
  }
}

window.modifyCookieExpiry = function(normalizedNom) {
  var cookieDiv = document.getElementById(normalizedNom);
  cookieDiv.innerHTML += `
      <br>
      <label for="${normalizedNom}NewExpiry">Nova Data d'Expiració:</label>
      <input type="datetime-local" id="${normalizedNom}NewExpiry" onchange="updateCookieExpiry('${normalizedNom}')">
  `;
}

window.updateCookieExpiry = function(normalizedNom) {
  var nouExpiracio = document.getElementById(normalizedNom+'NewExpiry').value;
  if(nouExpiracio) {
      var valor = getCookieValue(normalizedNom);
      document.cookie = normalizedNom + "=" + valor + "; expires=" + new Date(nouExpiracio).toUTCString() + "; path=/";
      refreshCookies();
  }
}

function getCookieValue(nom) {
  var cookies = document.cookie.split('; ');
  for(var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].split('=');
      if (cookie[0] === nom) {
          return cookie[1];
      }
  }
  return null;
}

function getCookieExpiry(nom) {
  var cookies = document.cookie.split('; ');
  for(var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].split('=');
      if (cookie[0] === nom) {
          return cookie[1].split(";")[1];
      }
  }
  return null;
}
