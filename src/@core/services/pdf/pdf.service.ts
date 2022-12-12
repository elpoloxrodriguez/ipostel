import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import { UtilService } from '../util/util.service';


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(
    private utilService: UtilService,
  ) { }


  CertificadoInscripcion(data: any, Qr: any, TokenQr: any) {
    const fecha = this.utilService.FechaActual()
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    doc.setProperties({
      title: "CERTIFICADO DE INSCRIPCIÓN SIRP-IPOSTEL",
      subject: "https://github.com/elpoloxrodriguez",
      author: "SIRP-IPOSTEL",
      keywords: "generated, javascript, web 2.0, ajax",
      creator: "CAP. ANDRÉS RICARDO RODRÍGUEZ DURÁN",
    });

    doc.addImage('assets/images/pdf/cintillo.png', "PNG", 5, 5, 200, 15);
    doc.addImage('assets/images/pdf/firma.png', "PNG", 80, 240, 65, 45);
    doc.addImage(Qr, "PNG", 170, 255, 30, 30);


    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.text(`N° O-OPP____- IP2022`, pageWidth - 178, pageHeight - 260, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.text(`Caracas, ${this.utilService.FechaMomentLL(fecha)}`, pageWidth - 40, pageHeight - 260, { align: 'center' });



    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("CERTIFICADO ÚNICO DE REGISTRO POSTAL", pageWidth / 2, pageHeight - 240, { maxWidth: 150, align: "center" });


    doc.setFont(undefined, "");
    doc.setFontSize(12);
    doc.text(`    El INSTITUTO POSTAL TELEGRÁFICO DE VENEZUELA, ente adscrito al Ministerio del
Poder Popular para Ciencia y Tecnología, creado mediante Ley Publicada en la Gaceta Oficial de
la República Bolivariana de Venezuela N° 2.146 Extraordinario, de fecha 28 de enero de 1978,
reformada parcialmente según Decreto N° 403, de fecha 21 de Octubre de 1999, Publicada en
la Gaceta Oficial de la República Bolivariana de Venezuela N° 5.398 Extraordinario, de fecha 26
de Octubre de 1999; el cual en lo sucesivo se denominará IPOSTEL, representado en este acto
por su Presidenta, Msc. OLGA YOMIRA PEREIRA JAIMES, Venezolana, mayor de edad, de
este domicilio, titular de la Cédula de Identidad N° V-14.551.754, designada por Decreto
Presidencial de la República Bolivariana de Venezuela N° 3.877 del 21 de Junio de 2019,
Publicada en la Gaceta Oficial de la República Bolivariana de Venezuela N° 41.660, de fecha 21
de Junio de 2019, quien actúa en ejercicio de las atribuciones que le confiere el articulo 17
literal “e” de la Ley antes citada y bajo Autorización del Directorio de IPOSTEL, según Punto de
cuenta N° ____ de Fecha ____/ ____/_____, agenda N° _____, en concordancia con el artículo
1° y 6° numeral “2°” del Reglamento sobre Concesión de los Servicios de Correos, OTORGA
mediante el presente Acto Unilateral, CONCESIÓN POSTAL N° ___-___ para la Prestación de
Servicios Postales y Telegráficos, a la Sociedad Mercantil ${data.nombre_empresa}, RIF ${data.rif} 
debidamente Inscrita por ante el Registro Mercantil ${data.n_registro}, en fecha ${this.utilService.FechaMomentLL(data.fecha_registro)},
anotado bajo el N° Tomo ${data.tomo} , cumplido como han sido los requisitos formales y 
sustanciales que para estos casos exigen las Leyes de la República en esta Materia.
La Presente Concesión solo se perfeccionará con la suscripción del Contrato de Concesión, 
que para los efectos legales será el Contrato N° ________ para el Período ___________, 
el cual contiene las condiciones y términos dictadas por IPOSTEL como ente regulador exclusivo
y excluyente de los servicios postales del Correo de Venezuela. El Lapso para que la 
Concesionaria suscriba el contrato con IPOSTEL, no podrá exceder de Veinte (20) días hábiles,
contados a partir del presente Otorgamiento. Transcurrido dicho plazo sin que se perfeccione 
el mismo, quedara revocada la concesión de pleno Derecho, en salvaguarda de los derechos que 
le asistan a IPOSTEL en la prestación de un Servicio de carácter público, continuo, seguro y 
confiable a favor de los Usuarios y Usuarias de los Servicios postales y telegráficos en el País.`,
      14,
      70,
      { maxWidth: 185, align: "justify" }
    );


    doc.setFont(undefined, "");
    doc.setFontSize(12);
    doc.text(`  Queda la Sociedad Mercantil ${data.nombre_empresa} inserta en los Libros de Registro
del Archivo Postal de Operadoras Privadas llevados por la Dirección de Gestión Postal de
IPOSTEL bajo el N° _____ Tomo ____ de Fecha __________ a los efectos de Ley.`,
      14,
      215,
      { maxWidth: 185, align: "justify" }
    );




    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text("Msc. OLGA YOMIRA PEREIRA JAIMES", 105, 275, { align: "center" });
    doc.setFontSize(10);
    doc.setFont(undefined, "");
    doc.text("PRESIDENTA (E) del Instituto Postal Telegráfico de Venezuela IPOSTEL", 105, 280, { align: "center" });
    doc.setFontSize(9);
    doc.text("Según Decreto Presidencial N° 3.877 del 21/06/2019,", 105, 285, { align: "center" });
    doc.setFontSize(9);
    doc.text("Publicada en la Gaceta Oficial N° 41.660, de fecha 21 de Junio de 2019.", 105, 290, { align: "center" });


    doc.setFontSize(9);
    doc.setFont(undefined, "bold");
    doc.text(TokenQr,
      175,
      285,
    );

    doc.save("Certificado Uníco de Inscripción.pdf");
    doc.autoPrint();
    // doc.output("dataurlnewwindow", { filename: 'Certificado Uníco de Inscripción.pdf' });
  }

  AutorizacionInscripcion(data: any, Qr: any, TokenQr: any) {
    const fecha = this.utilService.FechaActual()
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    doc.setProperties({
      title: "CERTIFICADO DE INSCRIPCIÓN SIRP-IPOSTEL",
      subject: "https://github.com/elpoloxrodriguez",
      author: "SIRP-IPOSTEL",
      keywords: "generated, javascript, web 2.0, ajax",
      creator: "CAP. ANDRÉS RICARDO RODRÍGUEZ DURÁN",
    });

    doc.addImage('assets/images/pdf/cintillo.png', "PNG", 5, 5, 200, 15);
    doc.addImage('assets/images/pdf/firma.png', "PNG", 80, 240, 65, 45);
    doc.addImage(Qr, "PNG", 170, 255, 30, 30);


    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.text(`N° O-OPP____- IP2022`, pageWidth - 178, pageHeight - 260, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.text(`Caracas, ${this.utilService.FechaMomentLL(fecha)}`, pageWidth - 40, pageHeight - 260, { align: 'center' });



    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("AUTORIZACION DE SUBCONTRATISTA PARA LA PRESTACION DE LOS SERVICIOS POSTALES DE OPERADORES POSTALES PRIVADOS", pageWidth / 2, pageHeight - 250, { maxWidth: 190, align: "center" });


    doc.setFont(undefined, "");
    doc.setFontSize(12);
    doc.text(`    El INSTITUTO POSTAL TELEGRÁFICO DE VENEZUELA, ente adscrito al Ministerio del Poder
Popular para Ciencia y Tecnología, creado mediante Ley Publicada en la Gaceta Oficial de la República
Bolivariana de Venezuela N° 2.146 Extraordinario, de fecha 28 de enero de 1978, reformada parcialmente
según Decreto N° 403, de fecha 21 de Octubre de 1999, Publicada en la Gaceta Oficial de la República
Bolivariana de Venezuela N° 5.398 Extraordinario, de fecha 26 de Octubre de 1999; el cual en lo sucesivo
se denominará IPOSTEL, representado en este acto por su Presidenta, Msc. OLGA YOMIRA PEREIRA
JAIMES, Venezolana, mayor de edad, de este domicilio, titular de la Cédula de Identidad N° V-
14.551.754, designada por Decreto Presidencial de la República Bolivariana de Venezuela N° 3.877 del 21
de Junio de 2019, Publicada en la Gaceta Oficial de la República Bolivariana de Venezuela N° 41.660, de
fecha 21 de Junio de 2019, quien actúa en ejercicio de las atribuciones que le confiere el articulo 17 literal
“e” de la Ley antes citada y bajo Autorización del Directorio de IPOSTEL, evidenciando la operatividad de
las empresas subcontratadas que realizan a nombre de su representada las actividades inherentes a la
prestación de los servicios públicos de correo, se procede a AUTORIZAR para la subcontratación de la
empresa XXX, sociedad mercantil inscrita en el Registro Mercantil Segundo de la Circunscripción Judicial
del Estado Aragua, en fecha XXX, bajo el N° Xxx, tomo XXX; la cual prestara servicios al Operador Postal
xxxxxxxxxxxxx identificado con el RIF J- XXXXXXX, Código Postal N° xxxxx, de conformidad a lo
establecido en el CONTRATO DE CONCESIÓN PARA LA PRESTACION DE LOS SERVICIOS PÚBLICOS DE 
CORREOS N°XXX, en su Capítulo XXX “DE LA SUBCONTRATACION PARA LA PRESTACIÓN DEL
SERVICIO”, suscrito con IPOSTEL en fecha XXX, debidamente autenticados ante la Notaría Pública
Tercera del Municipio Libertador, en la misma fecha, bajo el N° XXX, Tomo XXX, Folio xxx hasta XXX
previa revisión de los documentos consignados, SE RESULEVE AUTORIZAR POR UN PERIODO
SUPEDITADO A LA VIGENCIA DE LA CONCESIÓN DEL OPERADOR POSTAL PRIVADO, la
operatividad de la sociedad mercantil supra identificada.`,
      14,
      65,
      { maxWidth: 185, align: "justify" }
    );


    doc.setFont(undefined, "");
    doc.setFontSize(12);
    doc.text(`    Es importante acotar, que la presente AUTORIZACIÓN se encuentra sujeta tanto al pago que por
concepto de subcontratación debe realizar su representado ante este Instituto, tal como corresponde a los
Operadores Postales Privados, de conformidad a la Providencia Administrativa emitida a tal fin, asi como a
la inmediata consignación de los documentos solicitadas a tal fin.`,
      14,
      190,
      { maxWidth: 185, align: "justify" }
    );

    doc.setFont(undefined, "");
    doc.setFontSize(12);
    doc.text(`    Conforme a lo aprobado por el Directorio del Instituto Postal Telegráfico de Venezuela, según
Punto de Cuenta N° xxx en fecha XXX, Agenda XXX, el monto a cancelar por la empresa xxx, por concepto
de obligaciones postales, es el equivalente al cincuenta por ciento (50%) del costo actual de la Concesión
Postal, para lo cual deberá cancelar en el lapso que corresponda al Operador Postal Privado a que está
supeditado, conforme a lo establecido en la Contrato de Concesión suscrito por su representada.`,
      14,
      215,
      { maxWidth: 185, align: "justify" }
    );

    doc.setFont(undefined, "");
    doc.setFontSize(12);
    doc.text(`    Sin otro particular al cual hacer referencia, se suscribe de usted.`,
      14,
      245,
      { maxWidth: 185, align: "justify" }
    );


    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text("Msc. OLGA YOMIRA PEREIRA JAIMES", 105, 275, { align: "center" });
    doc.setFontSize(10);
    doc.setFont(undefined, "");
    doc.text("PRESIDENTA (E) del Instituto Postal Telegráfico de Venezuela IPOSTEL", 105, 280, { align: "center" });
    doc.setFontSize(9);
    doc.text("Según Decreto Presidencial N° 3.877 del 21/06/2019,", 105, 285, { align: "center" });
    doc.setFontSize(9);
    doc.text("Publicada en la Gaceta Oficial N° 41.660, de fecha 21 de Junio de 2019.", 105, 290, { align: "center" });

    doc.setFontSize(9);
    doc.setFont(undefined, "bold");
    doc.text(TokenQr,
      175,
      285,
    );

    doc.save("Autorizacion de Inscripción.pdf");
    doc.autoPrint();
    // doc.output("dataurlnewwindow", { filename: 'Certificado Uníco de Inscripción.pdf' });
  }

}
