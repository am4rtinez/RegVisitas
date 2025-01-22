document.addEventListener('DOMContentLoaded', () => {
	const tablaVisitas = document.getElementById('tablaVisitas').getElementsByTagName('tbody')[0];
	const fechaInicio = document.getElementById('fechaInicio');
	const fechaFin = document.getElementById('fechaFin');
	const btnFiltrar = document.getElementById('btnFiltrar');

	function formatearFecha(fechaStr) {
		if (!fechaStr) return ""; // Manejar fechas nulas o indefinidas

		const fecha = new Date(fechaStr);
		const horas = fecha.getHours().toString().padStart(2, '0');
		const minutos = fecha.getMinutes().toString().padStart(2, '0');
		const segundos = fecha.getSeconds().toString().padStart(2, '0');
		const dia = fecha.getDate().toString().padStart(2, '0');
		const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
		const anio = fecha.getFullYear().toString().slice(-2);

		return `${horas}:${minutos}:${segundos} ${dia}/${mes}/${anio}`;
	}

	function cargarVisitas(fechaInicioStr, fechaFinStr) {
			let url = '/visitas';
			let params = new URLSearchParams(); // Usamos URLSearchParams para construir la query string

			if (fechaInicioStr) {
					params.append('fechaInicio', fechaInicioStr);
			}
			if (fechaFinStr) {
					params.append('fechaFin', fechaFinStr);
			}

			if (Array.from(params).length > 0) { // Si hay parámetros, añadimos el signo de interrogación
					url += '?' + params.toString();
			}

			fetch(url)
					.then(response => response.json())
					.then(visitas => {
							tablaVisitas.innerHTML = '';
							visitas.forEach(visita => {
								const row = tablaVisitas.insertRow();
								const idCell = row.insertCell();
								const nombreCell = row.insertCell();
								const apellidosCell = row.insertCell();
								const empresaCell = row.insertCell();
								const motivoCell = row.insertCell();
								const fechaLlegadaCell = row.insertCell();
								const fechaSalidaCell = row.insertCell();
								idCell.textContent = visita.identificador;
								nombreCell.textContent = visita.nombre;
								apellidosCell.textContent = visita.apellidos;
								empresaCell.textContent = visita.empresa;
								motivoCell.textContent = visita.motivo;
								fechaLlegadaCell.textContent = formatearFecha(visita.fecha_llegada); // Formatear la fecha
								fechaSalidaCell.textContent = formatearFecha(visita.fecha_salida); // Formatear la fecha
								// Insertar otras celdas con los datos de la visita
							});
					})
					.catch(error => console.error("Error:", error));
	}

	btnFiltrar.addEventListener('click', () => {
			cargarVisitas(fechaInicio.value, fechaFin.value);
	});

	cargarVisitas(); // Cargar al inicio sin filtro
});