const encriptar = document.getElementById("button__encriptar");
const desencriptar = document.getElementById("button__desencriptar");
const copy = document.getElementById("button__copiar");
const textoInicial = document.getElementById("textoInput");
const textFinal = document.getElementById("textoFinal");
const munheco = document.getElementById("munheco");
const textInfo = document.getElementById("textoInfo");
const rigth = document.getElementById("rigth");

//remplace
const remplace = (newvalue) => {
  textFinal.innerHTML = newvalue;
  textFinal.classList.add("ajustar");
  rigth.classList.add("ajuste");
  textoInicial.value = "";
  textoInicial.style.height = "auto";
  textoInicial.placeholder = "Ingrese el texto aquí ...";
  munheco.classList.add("ocultar");
  textInfo.classList.add("ocultar");
  copy.classList.remove("bn_ocultar");
};

// reset
const reset = () => {
  textoInicial.value = "";
  textoInicial.style.height = "auto";
  textFinal.innerHTML = "";
  rigth.classList.remove("ajuste");
  textFinal.classList.remove("ajustar");
  munheco.classList.remove("ocultar");
  textFinal.placeholder = "¡Ningún mensaje fue encontrado!";
  textInfo.classList.remove("ocultar");
  copy.classList.add("bn_ocultar");
  textoInicial.focus();
};

// Validación de texto
const isValidText = (text) => {
  return /^[a-z\s]+$/.test(text); // Solo letras minúsculas y espacios
};

// Verifica si el texto está encriptado
const isEncrypted = (text) => {
  // Verifica si el texto contiene alguna de las palabras clave de encriptación
  return remplazar.some(([_, encryptedWord]) => text.includes(encryptedWord));
};

// Array con las palabras clave de encriptación
let remplazar = [
  ["e", "enter"],
  ["o", "ober"],
  ["i", "imes"],
  ["a", "ai"],
  ["u", "ufat"],
];

// evento botón de encriptar
encriptar.addEventListener("click", () => {
  const texto = textoInicial.value.trim(); // Trim para eliminar espacios en blanco al inicio y final
  if (texto !== "") {
    if (isValidText(texto)) {
      const encryptedText = remplazar.reduce((acc, [find, replace]) => {
        return acc.replaceAll(find, replace);
      }, texto);
      remplace(encryptedText);
    } else {
      alert("! Ingrese solo texto en minuscula y ningun caracter especial ¡");
      reset();
    }
  } else {
    alert("No ingreso ningun texto ...");
    reset();
  }
});

// evento botón de desencriptar
desencriptar.addEventListener("click", () => {
  const texto = textoInicial.value.trim(); // eliminar espacios en blanco al inicio y final
  if (texto !== "") {
    if (isValidText(texto)) {
      if (isEncrypted(texto)) {
        const decryptedText = remplazar.reduce((acc, [find, replace]) => {
          return acc.replaceAll(replace, find);
        }, texto);
        remplace(decryptedText);
      } else {
        alert("El texto ingresado no está encriptado.");
        reset();
      }
    } else {
      alert("Ingrese texto para desencriptar.");
      reset();
    }
  }
});

// evento para el botón de copiar
copy.addEventListener("click", () => {
  textFinal.select();
  document.execCommand("copy");
  /*alert("Texto Copiado");*/
  reset();
});
//auto ajuste de textarea
textoInicial.addEventListener("change", (e) => {
  textoInicial.style.height = "auto";
  let scHeight = e.target.scrollHeight;
  textoInicial.style.height = `${scHeight}px`;
});
textoInicial.addEventListener("keyup", (e) => {
  textoInicial.style.height = "auto";
  let scHeight = e.target.scrollHeight;
  textoInicial.style.height = `${scHeight}px`;
});
