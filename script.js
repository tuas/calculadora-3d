function calculate() {
    const precioKG = parseFloat(document.getElementById('precioKG').value);
    const precioKwh = parseFloat(document.getElementById('precioKwh').value);
    const consumoReal = parseFloat(document.getElementById('consumoReal').value);
    const desgasteMaquina = parseFloat(document.getElementById('desgasteMaquina').value);
    const precioRepuestos = parseFloat(document.getElementById('precioRepuestos').value);
    const margenError = parseFloat(document.getElementById('margenError').value);
    const horasImpresion = parseFloat(document.getElementById('horasImpresion').value);
    const gramosFilamento = parseFloat(document.getElementById('gramosFilamento').value);
    const margenGanancia = parseFloat(document.getElementById('margenGanancia').value);

    const precioMaterial = (gramosFilamento * precioKG) / 1000;
    const precioLuz = ((consumoReal * precioKwh) / 1000) * horasImpresion;
    const desgasteMaquinaResult = (desgasteMaquina / horasImpresion) * precioRepuestos;
    const margenErrorResult = (precioMaterial + precioLuz + desgasteMaquinaResult) * (margenError / 100);
    const costo = precioMaterial + precioLuz + desgasteMaquinaResult + margenErrorResult;
    const totalCobrar = costo * margenGanancia;

    document.getElementById('precioMaterial').value = precioMaterial.toFixed(2);
    document.getElementById('precioLuz').value = precioLuz.toFixed(2);
    document.getElementById('desgasteMaquinaResult').value = desgasteMaquinaResult.toFixed(2);
    document.getElementById('margenErrorResult').value = margenErrorResult.toFixed(2);
    document.getElementById('costo').value = costo.toFixed(2);
    document.getElementById('totalCobrar').value = totalCobrar.toFixed(2);
}

function saveFile() {
    const fileName = document.getElementById('fileName').value;
    if (!fileName) {
        alert("Por favor, ingresa un nombre para el archivo.");
        return;
    }

    const data = {
        precioKG: document.getElementById('precioKG').value,
        precioKwh: document.getElementById('precioKwh').value,
        consumoReal: document.getElementById('consumoReal').value,
        desgasteMaquina: document.getElementById('desgasteMaquina').value,
        precioRepuestos: document.getElementById('precioRepuestos').value,
        margenError: document.getElementById('margenError').value,
        horasImpresion: document.getElementById('horasImpresion').value,
        gramosFilamento: document.getElementById('gramosFilamento').value,
        margenGanancia: document.getElementById('margenGanancia').value,
        precioMaterial: document.getElementById('precioMaterial').value,
        precioLuz: document.getElementById('precioLuz').value,
        desgasteMaquinaResult: document.getElementById('desgasteMaquinaResult').value,
        margenErrorResult: document.getElementById('margenErrorResult').value,
        costo: document.getElementById('costo').value,
        totalCobrar: document.getElementById('totalCobrar').value
    };

    localStorage.setItem(fileName, JSON.stringify(data));
    alert("Archivo guardado correctamente.");
    updateFileList();
}

function loadFile() {
    const fileName = document.getElementById('fileName').value;
    if (!fileName) {
        alert("Por favor, ingresa un nombre para el archivo.");
        return;
    }

    const data = JSON.parse(localStorage.getItem(fileName));
    if (!data) {
        alert("Archivo no encontrado.");
        return;
    }

    document.getElementById('precioKG').value = data.precioKG;
    document.getElementById('precioKwh').value = data.precioKwh;
    document.getElementById('consumoReal').value = data.consumoReal;
    document.getElementById('desgasteMaquina').value = data.desgasteMaquina;
    document.getElementById('precioRepuestos').value = data.precioRepuestos;
    document.getElementById('margenError').value = data.margenError;
    document.getElementById('horasImpresion').value = data.horasImpresion;
    document.getElementById('gramosFilamento').value = data.gramosFilamento;
    document.getElementById('margenGanancia').value = data.margenGanancia;
    document.getElementById('precioMaterial').value = data.precioMaterial;
    document.getElementById('precioLuz').value = data.precioLuz;
    document.getElementById('desgasteMaquinaResult').value = data.desgasteMaquinaResult;
    document.getElementById('margenErrorResult').value = data.margenErrorResult;
    document.getElementById('costo').value = data.costo;
    document.getElementById('totalCobrar').value = data.totalCobrar;

    alert("Archivo cargado correctamente.");
}

function updateFileList() {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const li = document.createElement('li');
        li.textContent = key;
        li.onclick = () => {
            document.getElementById('fileName').value = key;
            loadFile();
        };
        fileList.appendChild(li);
    }
}

// Inicializar la lista de archivos al cargar la página
updateFileList();
