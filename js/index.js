class index {
	constructor(reset = false) {
		if(reset) {
			window.self = new index()
			window.UI = new index_UI(true)
			window.ajax = new Ajax("php/listener.php")
		}
	}

	async ALTAS(data){
		if(self.validar(data)){
			let r = await ajax.post(data) // Solicito un ID
			
			r = JSON.parse(r)
			r.servicio = "ALTAS"
			UI.actualizar(r)
			r = await ajax.post(r) // (Solicito un Alta)

			r = JSON.parse(r) // Se obtienen los resultados
			const mensaje = r.resultado != 0 ? "Alta exitosa" : "Alta fallida"
			UI.notificacion(mensaje)
			UI.select.innerHTML = ""
		}
	}
	
	async BAJAS(data){
		if(self.validar(data)){
			let r = await ajax.post(data) //Solicito Bajas

			r = JSON.parse(r)
			let mensaje 
			if( r.resultado != 0){
				mensaje = "Baja exitosa"
				if(UI.select.options.length -1 > 1){
					UI.select.options[UI.select.selectedIndex].remove()
				}else{
					UI.select.innerHTML = ""
				}
			}else{
				mensaje = "Ya fue eliminado"
			}
			UI.notificacion(mensaje)
			UI.limpiar()
		}
	}

	async CONSULTAS(data){
		if(self.validar(data)){
			let r = await ajax.post(data) // Solicito un Consultas

			r = JSON.parse(r)
			UI.select.innerHTML = ""
			UI.mostrarConsultas(r)
			UI.notificacion("")
		}
	}

	async CAMBIOS(data){
		if(self.validar(data)){
			let r = await ajax.post(data) // Solicito un Cambios

			r = JSON.parse(r)
			let mensaje 
			console.log(r)
			if( r.resultado != 0){
				mensaje = "Cambio exitoso"
				UI.select.options[UI.select.selectedIndex].innerText = UI.nombre.value + " "+ UI.nacionalidad.value + " " + UI.edad.value
			}else{
				mensaje = "Cambio fallido"
			}
			UI.notificacion(mensaje)
		}
	}

	async CONSULTAS_NOMBRE(data){
		if(self.validar(data)){
			let r = await ajax.post(data) // Solicito un Cambios

			r = JSON.parse(r)
			UI.select.innerHTML = ""
			if(r.resultado != 0){
				UI.mostrarConsultas(r)
				UI.notificacion("")
			}else{
				UI.select.innerHTML = ""
				UI.notificacion("Consulta fallida")
			}
		}
	}

	async CONSULTAS_SIGUIENTE(data){
		if(self.validar(data)){
			let r = await ajax.post(data) // Solicito un Cambios

			r = JSON.parse(r)
			if(r.resultado != 0){
				UI.mostrarConsultaSA(r)
				UI.notificacion("")
			}else{
				alert("Ya no hay mas")
			}
		}
	}

	async CONSULTAS_ANTERIOR(data){
		if(self.validar(data)){
			let r = await ajax.post(data) // Solicito un Cambios

			r = JSON.parse(r)
			if(r.resultado != 0){
				UI.mostrarConsultaSA(r)
				UI.notificacion("")
			}else{
				alert("Ya no hay mas")
			}
		}
	}	


	validar(datos) {
		let bandera = true
		if(datos.hasOwnProperty("nombre")){
			if(datos.nombre == "")
				bandera = false
			
		}
		if(datos.hasOwnProperty("nacionalidad")){
			if(datos.nacionalidad == "")
				bandera = false
			
		} 
		if(datos.hasOwnProperty("edad")){
			if(datos.edad == "")
				bandera = false
			
		}
		if(!bandera) alert("Error en los datos")
		return bandera
	}

	// Calbacks
	ERROR(e) {
		alert(e.message)
	}

}
window.onload = () => new index(true)