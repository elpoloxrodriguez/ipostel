import { Injectable } from '@angular/core';

export interface IPOSTEL_C_OPP {
	nombre_empresa	:	string
	rif	:	string
	status	:	number
	tipo_registro	:	number
	opp	?:	number
	direccion_empresa	:	string
	estado_empresa	?:	string
	ciudad_empresa	?:	string
	municipio_empresa	?:	string
	parroquia_empresa	?:	string
	correo_electronico	:	string
	empresa_facebook	:	string
	empresa_instagram	:	string
	empresa_twitter	:	string
	tipo_agencia	?:	number
	sucursales	?:	number
	subcontrataciones	?:	number
	tipologia_empresa	?:	number
	tipo_servicio	:	string
	licencia_actividades_economicas_municipales	:	string
	actividades_economicas_seniat	:	string
	certificado_rupdae	:	string
	patronal_ivss	:	string
	matricula_inces	:	string
	identificacion_laboral_ministerio_trabajo	:	string
	certificado_eomic	:	string
	permiso_bomberos	:	string
	registro_sapi	:	string
	registro_nacional_contratista	:	string
	flota_utilizada	:	string
	total_arrendados	?:	number
	total_propio	?: number
	subcontratados	?:	number
	alianzas	?:	number
	otros	?:	number
	cantidad_trabajadores	?:	number
	cantidad_subcontratados	?:	number
}

export interface IPOSTEL_C_RepresentanteLegal {
	id_opp	 :	number
	n_registro	 :	string
	fecha_registro	 :	string
	tomo : string
	nombres_representante_legal	 :	string
	apellidos_representante_legal	 :	string
	cedula_representante_legal	 :	string
	direccion_representante_legal	 :	string
	email_representante_legal	 :	string
	facebook_representante_legal	 :	string
	instagram_representante_legal	 :	string
	twitter_representante_legal	 :	string
	cargo_representante_legal	 :	string
	telefono_movil_representante_legal	 :	string
	telefono_residencial_representante_legal	 :	string
}


export interface IPOSTEL_C_DelegadoOPP {
	id_opp	 ?:	number
	nombres_delegado	 :	string
	apellidos_delegado	 :	string
	cedula_delegado	 :	string
	cargo_delegado	 :	string
	telefono_delegado	 :	string
	email_delegado	 :	string
	facebook_delegado	 :	string
	instagram_delegado	 :	string
	twitter_delegado	 :	string
}


@Injectable({
	providedIn: 'root'
})
export class EmpresaService {

	constructor() { }
}
