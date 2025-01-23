document.addEventListener('DOMContentLoaded', function() {
	const canvas = document.getElementById('firma');
	const ctx = canvas.getContext('2d');
	let isDrawing = false;

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

	document.getElementById('registroForm').addEventListener('submit', function(event) {
			event.preventDefault();

			const identificador = document.getElementById('identificador').value;
			const nombre = document.getElementById('nombre').value;
			const apellidos = document.getElementById('apellidos').value;
			const empresa = document.getElementById('empresa').value;
			const motivo = document.getElementById('motivo').value;
			const firmaData = canvas.toDataURL(); // Obtiene los datos de la firma en base64
			document.getElementById('firmaData').value = firmaData; // Asigna el valor al campo oculto

			fetch('/registrar', {
					method: 'POST',
					headers: {
							'Content-Type': 'application/json'
					},
					body: JSON.stringify({ identificador, nombre, apellidos, empresa, motivo, firma: firmaData })
			})
			.then(response => response.json())
			.then(data => {
					document.getElementById('mensaje').textContent = data.mensaje;
					document.getElementById('registroForm').reset();
					ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
			});
	});

	document.getElementById('salidaForm').addEventListener('submit', function(event) {
		event.preventDefault();

		const identificadorSalida = document.getElementById('identificadorSalida').value;

		fetch('/registrarSalida', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ identificador: identificadorSalida })
		})
		.then(response => response.json())
		.then(data => {
				document.getElementById('mensajeSalida').textContent = data.mensaje;
				document.getElementById('salidaForm').reset();
		})
		.catch(error => {
				console.error("Error en la petición de salida:", error);
				document.getElementById('mensajeSalida').textContent = "Error al registrar la salida.";
		});
	});
});