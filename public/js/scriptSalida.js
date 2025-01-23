document.addEventListener('DOMContentLoaded', function() {
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