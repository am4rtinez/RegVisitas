document.addEventListener('DOMContentLoaded', function () {
	const canvas = document.getElementById('firma');
	const ctx = canvas.getContext('2d');
	let isDrawing = false;
	let rect = canvas.getBoundingClientRect();

	// Ajusta el canvas al tamaño del contenedor
	canvas.width = rect.width;
	canvas.height = rect.height;

	// Lógica para dibujar la firma
	canvas.addEventListener('mousedown', (e) => {
			isDrawing = true;
			ctx.beginPath();
			ctx.moveTo(e.offsetX, e.offsetY);
	});

	canvas.addEventListener('mousemove', (e) => {
			if (isDrawing) {
					ctx.lineTo(e.offsetX, e.offsetY);
					ctx.stroke();
			}
	});

	canvas.addEventListener('mouseup', () => {
			isDrawing = false;
	});

	canvas.addEventListener('mouseout', () => {
			isDrawing = false;
	});

	// Envío del formulario
	document.getElementById('registroForm').addEventListener('submit', function (event) {
			event.preventDefault();

			const identificador = document.getElementById('identificador').value;
			const nombre = document.getElementById('nombre').value;
			const apellidos = document.getElementById('apellidos').value;
			const empresa = document.getElementById('empresa').value;
			const motivo = document.getElementById('motivo').value;
			const firmaData = canvas.toDataURL();
			document.getElementById('firmaData').value = firmaData;

			fetch('/registrar', {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({
					identificador,
					nombre,
					apellidos,
					empresa,
					motivo,
					firma: firmaData
				})
			})
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(error => console.log(error))
			// .then(data => {
			// 		document.getElementById('mensajeEntrada').textContent = data.mensaje;
			// 		document.getElementById('registroForm').reset();
			// 		ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas después del envío
			// })
			// .catch(error => {
			// 		console.error("Error en la petición:", error);
			// 		document.getElementById('mensajeEntrada').textContent = "Error al registrar la visita.";
			// });
	});

	// Limpia el canvas al resetear el formulario
	document.getElementById('registroForm').addEventListener('reset', function () {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
	});

	// Ajusta el tamaño del canvas al redimensionar la ventana
	window.addEventListener('resize', () => {
			rect = canvas.getBoundingClientRect();
			canvas.width = rect.width;
			canvas.height = rect.height;
	});
});