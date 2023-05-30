class index_UI {
	constructor(reset = false) {
		if(reset) {
			// Obtengo los acceso a los elementos de mi página
			this.form = document.querySelector("form")
			this.select = document.querySelector("#select")
			//this.contenedor = document.querySelector("#contenedor")
			this.enviar = document.querySelector("#enviar")
			this.bajas = document.querySelector("#bajas")
			this.cambios = document.querySelector("#cambios")
			this.consultaNombre = document.querySelector("#consultaNombre")
			this.consultaGeneral = document.querySelector("#consultaGeneral")
			this.consultas_anterior = document.querySelector("#anterior")
			this.consultas_siguiente = document.querySelector("#siguiente")
			this.mensaje = document.querySelector("#mensaje")


			this.nombre = document.querySelector("#nombre")
			this.nacionalidad = document.querySelector("#nacionalidad")
			this.edad = document.querySelector("#edad")
			this.data = document.querySelector("#data")
			this.id = document.querySelector("#id")

			// Fijo eventos
			this.enviar.addEventListener("click", this.altas_click)
			this.bajas.addEventListener("click", this.bajas_click)
			this.cambios.addEventListener("click", this.cambios_click)
			this.consultaNombre.addEventListener("click", this.consultas_nombre_click)
			this.consultaGeneral.addEventListener("click", this.consultas_click)
			this.consultas_anterior.addEventListener("click", this.consultas_anterior_click)
			this.consultas_siguiente.addEventListener("click", this.consultas_siguiente_click)
			this.select.addEventListener('change', this.seleccionar_click)
		}
	}

	altas_click(e) {
		let datos = UI.recuperar("ALTAS")
		datos.servicio = "ID" // Este botón solicita el servicio de ALTAS
		self.ALTAS(datos) // Validará el controlador
	}

	bajas_click(e) {
		let datos = UI.recuperar("BAJAS")
		datos.servicio = "BAJAS" // Este botón solicita el servicio de ALTAS
		self.BAJAS(datos) // Validará el controlador
	}
	cambios_click(e) {
		let datos = UI.recuperar("CAMBIOS")
		datos.servicio = "CAMBIOS" // Este botón solicita el servicio de ALTAS
		self.CAMBIOS(datos) // Validará el controlador
	}
	consultas_click(e){
		let datos = UI.recuperar()
		datos.servicio = "CONSULTAS"
		self.CONSULTAS(datos) // Validará el controlador
	}
	consultas_nombre_click(e){
		let datos = UI.recuperar("CONSULTAS_NOMBRE")
		datos.servicio = "CONSULTAS_NOMBRE" // Este botón solicita el servicio de ALTAS
		self.CONSULTAS_NOMBRE(datos) // Validará el controlador
	}

	seleccionar_click(e){
		let target = e.target
		UI.actualizar(target[target.selectedIndex].data)
		
		//document.querySelector("#id").value = target[target.selectedIndex].value
		//UI.contenedor.value  = target[target.selectedIndex].text
    }

	mostrarConsultaSA(data){
		this.actualizar(data)
	}
	mostrarConsultas(data){
		let option = document.createElement("option");
		option.innerText = "Coincidencias encontradas"
		this.select.appendChild(option)
		if(Array.isArray(data)){
			for (const persona of data){
				let option = document.createElement("option");
    			option.setAttribute("value", persona.id);
				option.innerText = persona.nombre + " " + persona.nacionalidad + " " + persona.edad
				option.data = persona
				this.select.appendChild(option)
			}
		}else{
			this.actualizar(data)
			let option = document.createElement("option");
    		option.setAttribute("value", data.id);
			option.innerText = data.nombre + " " + data.nacionalidad + " " + data.edad
			option.data = data
			this.select.appendChild(option)
		}
	}
	actualizar(data){
		UI.id.value = data.id
		UI.nombre.value = data.nombre
		UI.nacionalidad.value = data.nacionalidad
		UI.edad.value = data.edad
		
	}
	limpiar(){
		UI.id.value = ""
		UI.nombre.value = ""
		UI.nacionalidad.value = ""
		UI.edad.value  = ""
	}
	consultas_anterior_click(e){
		let datos = UI.recuperar("CONSULTAS_ANTERIOR")
		datos.servicio = "CONSULTAS_ANTERIOR" // Este botón solicita el servicio de ALTAS
		self.CONSULTAS_ANTERIOR(datos) // Validará el controlador
	}

	consultas_siguiente_click(e){
		let datos = UI.recuperar("CONSULTAS_SIGUIENTE")
		datos.servicio = "CONSULTAS_SIGUIENTE" // Este botón solicita el servicio de ALTAS
		self.CONSULTAS_SIGUIENTE(datos) // Validará el controlador
	}

	notificacion(mensaje){ 
		this.mensaje.innerText = mensaje
	}
	recuperar(servicio) {
		let datos = {}
		if(servicio == "ALTAS" || servicio == "CAMBIOS"){
			datos.nombre = UI.nombre.value 
			datos.nacionalidad = UI.nacionalidad.value 
			datos.edad = UI.edad.value 
			if(servicio == "CAMBIOS"){
				datos.id = UI.id.value 		
			}
		}
		if(servicio == "BAJAS" || servicio == "CONSULTAS_SIGUIENTE" || servicio == "CONSULTAS_ANTERIOR"){
			datos.id = UI.id.value 
		}
		if(servicio == "CONSULTAS_NOMBRE"){
			datos.nombre = UI.nombre.value 
		}
		return datos
	}
}