let listOfFriends = [];

// Función para agregar un amigo
function agregarAmigo() {
  const valueOfName = document.getElementById("amigo").value.trim();

  // Verificar si el campo está vacío
  if (valueOfName === "") {
    alert("Por favor, ingrese un nombre válido");
  }
  // Verificar si el nombre ya existe en la lista
  else if (listOfFriends.includes(valueOfName)) {
    alert("Ese nombre ya existe, intente con otro");
  } else {
    // Agregar el nuevo amigo a la lista
    listOfFriends.push(valueOfName);
    document.getElementById("amigo").value = "";
    renderizarLista();
  }
}

// Función para renderizar la lista de amigos
function renderizarLista() {
  const listaAmigos = document.getElementById("listaAmigos");
  listaAmigos.innerHTML = listOfFriends
    .map(
      (amigo, index) => `
    <li>
      ${amigo}
      <button class="button-delete" onclick="eliminarAmigo(${index})" aria-label="Eliminar ${amigo}">
        ❌
      </button>
    </li>
  `
    )
    .join("");
}

// Función para eliminar un amigo de la lista
function eliminarAmigo(index) {
  listOfFriends.splice(index, 1);
  renderizarLista();
  limpiarSorteo();
}

function limpiarSorteo() {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";
}

// Función para realizar el sorteo
function sortearAmigo() {
  if (listOfFriends.length > 1) {
    const resultado = document.getElementById("resultado");
    const shuffled = [...listOfFriends].sort(() => Math.random() - 0.5);
    const paired = shuffled.map((amigo, i) => ({
      giver: amigo,
      receiver: shuffled[(i + 1) % shuffled.length],
    }));

    resultado.innerHTML = paired
      .map(
        (par) => `
      <li>${par.giver} le regala a ${par.receiver}</li>
    `
      )
      .join("");
  } else {
    resultado.innerHTML = ""; // Limpia la lista de resultados
    alert("Ops, debe ingresar por lo menos 2 nombres para realizar el sorteo.");
  }
}

// Escuchar la tecla Enter en el campo de texto
document.getElementById("amigo").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    agregarAmigo();
  }
});

//Limpiar el sorteo
function resetSortearAmigo() {
  listOfFriends = [];
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  const inputAmigo = document.getElementById("amigo");
  inputAmigo.value = "";
  inputAmigo.focus();

  renderizarLista();
}
