const MODEL_URL = "./modelo/";
let model;

window.onload = async function () {
  const modelURL = MODEL_URL + "model.json";
  const metadataURL = MODEL_URL + "metadata.json";
  document.getElementById("resultado").innerText = "Cargando modelo...";
  model = await tmImage.load(modelURL, metadataURL);
  document.getElementById("resultado").innerText = "Modelo cargado. Sube una imagen.";
};

async function cargarImagen(event) {
  if (!model) {
    document.getElementById("resultado").innerText = "El modelo aún no está listo.";
    return;
  }
  const imgElement = document.getElementById("imagenPrevia");
  imgElement.src = URL.createObjectURL(event.target.files[0]);
  imgElement.onload = async () => {
    imgElement.style.display = "block";
    const prediction = await model.predict(imgElement);
    const mejorResultado = prediction.sort((a, b) => b.probability - a.probability)[0];
    document.getElementById("resultado").innerText = `Resultado: ${mejorResultado.className} (${(mejorResultado.probability * 100).toFixed(2)}%)`;
  };
}