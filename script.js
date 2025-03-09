function calculate() {
    // Obtener valores y convertirlos a enteros
    const precioKG = parseInt(document.getElementById('precioKG').value);
    const precioKwh = parseInt(document.getElementById('precioKwh').value);
    const consumoReal = parseInt(document.getElementById('consumoReal').value);
    const desgasteMaquina = parseInt(document.getElementById('desgasteMaquina').value);
    const precioRepuestos = parseInt(document.getElementById('precioRepuestos').value);
    const margenError = parseInt(document.getElementById('margenError').value) / 100;
    const horasImpresion = parseInt(document.getElementById('horasImpresion').value);
    const gramosFilamento = parseInt(document.getElementById('gramosFilamento').value);
    const margenGanancia = parseInt(document.getElementById('margenGanancia').value) / 100;

    // Cálculos
    const precioMaterial = (gramosFilamento * precioKG) / 1000;
    const precioLuz = ((consumoReal * precioKwh) / 1000) * horasImpresion;
    const desgasteMaquinaResult = (precioRepuestos / desgasteMaquina) * horasImpresion;
    const margenErrorResult = (precioMaterial + precioLuz + desgasteMaquinaResult) * margenError;
    const costo = precioMaterial + precioLuz + desgasteMaquinaResult + margenErrorResult;
    const totalCobrar = costo * margenGanancia;

    // Mostrar resultados redondeados
    document.getElementById('precioMaterial').value = Math.round(precioMaterial);
    document.getElementById('precioLuz').value = Math.round(precioLuz);
    document.getElementById('desgasteMaquinaResult').value = Math.round(desgasteMaquinaResult);
    document.getElementById('margenErrorResult').value = Math.round(margenErrorResult);
    document.getElementById('costo').value = Math.round(costo);
    document.getElementById('totalCobrar').value = Math.round(totalCobrar);
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

    // Cargar datos en los campos
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
        li.className = 'file-item';
        li.innerHTML = `
            <span>${key}</span>
            <button onclick="deleteFile('${key}')">Eliminar</button>
        `;
        li.onclick = () => {
            document.getElementById('fileName').value = key;
            loadFile();
        };
        fileList.appendChild(li);
    }
}

function deleteFile(key) {
    localStorage.removeItem(key);
    updateFileList();
    alert("Archivo eliminado correctamente.");
}

// Inicializar la lista de archivos al cargar la página
updateFileList();
