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
          Valor: ${valor} 
          <button onclick="modifyCookie('${normalizedNom}')">Modificar</button> 
          <button onclick="deleteCookie('${nom}')">Eliminar</button>
      </div>
  `;
}

window.deleteCookie = function(nom) {
  document.cookie = nom + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  refreshCookies();
}

window.modifyCookie = function(normalizedNom) {
  let cookieDiv = document.getElementById(normalizedNom);
  cookieDiv.innerHTML += `
      <br>
      <label for="${normalizedNom}NewExpiry">Nova Data d'Expiració:</label>
      <input type="datetime-local" id="${normalizedNom}NewExpiry" onchange="updateCookieExpiry('${normalizedNom}')">
  `;
}

window.updateCookieExpiry = function(normalizedNom) {
  let nouExpiracio = document.getElementById(normalizedNom+'NewExpiry').value;
  if(nouExpiracio) {
      let valor = getCookieValue(normalizedNom);
      document.cookie = normalizedNom + "=" + valor + "; expires=" + new Date(nouExpiracio).toUTCString() + "; path=/";
      refreshCookies();
  }
}

function getCookieValue(nom) {
  let cookies = document.cookie.split('; ');
  for(let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].split('=');
      if (cookie[0] === nom) {
          return cookie[1];
      }
  }
  return null;
}
