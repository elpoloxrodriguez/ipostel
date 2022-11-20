import { Injectable } from '@angular/core';

export interface IPOSTEL_C_OPP {
	nombre_empresa	:	string
	rif	:	string
	direccion_empresa	:	string
	estado_empresa	?:	string
	ciudad_empresa	?:	string
	municipio_empresa	?:	string
	parroquia_empresa	?:	string
	correo_electronico	:	string
	empresa_facebook	:	string
	empresa_instagram	:	string
	empresa_twitter	:	string
	tipo_agencia	:	number
	sucursales	:	number
	subcontrataciones	:	number
	tipologia_empresa	:	number
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
	total_arrendados	:	number
	total_propio	:	number
	subcontratados	:	number
	alianzas	:	number
	otros	:	number
	cantidad_trabajadores	:	number
	cantidad_subcontratados	:	number
}


@Injectable({
	providedIn: 'root'
})
export class EmpresaService {

	constructor() { }
}
