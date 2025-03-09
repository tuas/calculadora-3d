function calculate() {
    // Obtener valores y convertirlos a enteros
    const precioKG = parseInt(document.getElementById('precioKG').value);
    const precioKwh = parseInt(document.getElementById('precioKwh').value);
    const consumoReal = parseInt(document.getElementById('consumoReal').value);
    const desgasteMaquina = parseInt(document.getElementById('desgasteMaquina').value);
    const precioRepuestos = parseInt(document.getElementById('precioRepuestos').value);
    const margenError = parseInt(document.getElementById('margenError').value);
    const horasImpresion = parseInt(document.getElementById('horasImpresion').value);
    const gramosFilamento = parseInt(document.getElementById('gramosFilamento').value);
    const margenGanancia = parseInt(document.getElementById('margenGanancia').value);

    // Cálculos
    const precioMaterial = (gramosFilamento * precioKG) / 1000;
    const precioLuz = ((consumoReal * precioKwh) / 1000) * horasImpresion;
    const desgasteMaquinaResult = (precioRepuestos / desgasteMaquina) * horasImpresion;
    const margenErrorResult = ((precioMaterial + precioLuz + desgasteMaquinaResult) *( margenError/100);
    const costo = precioMaterial + precioLuz + desgasteMaquinaResult + margenErrorResult;
    const totalCobrar = costo * margenGanancia;

    // Mostrar resultados redondeados
    document.getElementById('precioMaterial').value = Math.round(precioMaterial);
    document.getElementById('precioLuz').value = Math.round(precioLuz);
    document.getElementById('desgasteMaquinaResult').value = Math.round(desgasteMaquinaResult);
    document.getElementById('margenErrorResult').value = Math.round(margenErrorResult);
    document.getElementById('costo').value = Math.round(costo);
    document.getElementById('totalCobrar').value = Math.round(totalCobrar);
    // Guardar en la tabla
    addToTable(costoTotal, totalCobrar);
}

// Función para agregar resultados a la tabla
function addToTable(costoTotal, totalCobrar) {
    const tabla = document.getElementById('tabla');
    const fecha = new Date().toLocaleString();

    // Crear nueva fila
    const nuevaFila = document.createElement('div');
    nuevaFila.className = 'fila';
    nuevaFila.innerHTML = `
        <span>${fecha}</span>
        <span>${costoTotal.toFixed(2)} €</span>
        <span>${totalCobrar.toFixed(2)} €</span>
    `;

    // Agregar fila a la tabla
    tabla.appendChild(nuevaFila);
}

// Función para guardar los datos en un archivo JSON
function saveFile() {
    const filas = document.querySelectorAll('#tabla .fila');
    const datos = [];

    filas.forEach(fila => {
        const [fecha, costo, total] = fila.querySelectorAll('span');
        datos.push({
            fecha: fecha.textContent,
            costo: costo.textContent,
            total: total.textContent
        });
    });

    const datosStr = JSON.stringify(datos, null, 2);
    const blob = new Blob([datosStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'datos_impresiones.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Función para cargar los datos desde un archivo JSON
function loadFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const datos = JSON.parse(e.target.result);
                const tabla = document.getElementById('tabla');
                tabla.innerHTML = '<h2>Tabla</h2>';

                datos.forEach(dato => {
                    const nuevaFila = document.createElement('div');
                    nuevaFila.className = 'fila';
                    nuevaFila.innerHTML = `
                        <span>${dato.fecha}</span>
                        <span>${dato.costo}</span>
                        <span>${dato.total}</span>
                    `;
                    tabla.appendChild(nuevaFila);
                });
            };
            reader.readAsText(file);
        }
    };

    input.click();
}
