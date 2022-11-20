import { CoreMenu } from '@core/types';

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  // Dashboard
  {
    id: 'dashboard/home',
    nombre: 'Principal',
    // role: ['0','9'], 
    icono: 'home',
    type: 'item',
    url: 'home',
  },
  // Empresa
  {
    id: 'RegistroContribuyente',
    nombre: 'Empresa',
    title: 'Empresa',
    role: ['0'],
    type: 'collapsible',
    icono: 'file-text',
    children: [
      {
        id: 'GestionInscripcion',
        nombre: 'Gestion Inscripción',
        type: 'item',
        icono: 'circle',
        url: 'taxpayer-record/registration-management'
      },
      {
        id: 'DeclaracionPagos',
        nombre: 'Declaracion y Pagos',
        type: 'item',
        icono: 'circle',
        url: 'taxpayer-record/declaration-payments'
      }
    ]
  },
  // Documentacion
  {
    id: 'DocumentacionDigital',
    nombre: 'Documentacion Digital',
    title: 'Documentacion Digital',
    role: ['8', '9'],
    type: 'collapsible',
    icono: 'folder-plus',
    children: [
      {
        id: 'contribuyentes',
        nombre: 'Contribuyentes',
        type: 'item',
        icono: 'circle',
        url: 'digital-documentation/taxpayers'
      },
      {
        id: 'comunicaciones',
        nombre: 'Comunicaciones',
        type: 'item',
        icono: 'circle',
        url: 'digital-documentation/communications'
      }
    ]
  },
  // Recaudacion
  {
    id: 'Recaudacion',
    nombre: 'Recaudacion',
    title: 'Recaudacion',
    type: 'collapsible',
    role: ['9'],
    icono: 'check-circle',
    children: [
      {
        id: 'contribuyentes',
        nombre: 'Empresas Contribuyentes',
        type: 'item',
        icono: 'circle',
        url: 'financial-collection/contributing-companies'
      },
      {
        id: 'comunicaciones',
        nombre: 'Pagos Contribuyentes',
        type: 'item',
        icono: 'circle',
        url: 'financial-collection/taxpayer-payments'
      },
      {
        id: 'comunicaciones',
        nombre: 'Gestión Metas',
        type: 'item',
        icono: 'circle',
        url: 'financial-collection/goal-management'
      }
    ]
  },
  // Fiscalizacion
  {
    id: 'Fiscalizacion',
    nombre: 'Fiscalización',
    title: 'Fiscalización',
    role: ['8', '9'],
    type: 'collapsible',
    icono: 'folder',
    children: [
      {
        id: 'contribuyentes',
        nombre: 'Información de Contribuyentes',
        type: 'item',
        icono: 'circle',
        url: 'inspection/contributing-companies'
      },
    ]
  },
  // Juridico
  {
    id: 'Juridicos',
    nombre: 'Juridico',
    title: 'Juridico',
    role: ['8', '9'],
    type: 'collapsible',
    icono: 'folder',
    children: [
      {
        id: 'contribuyentes',
        nombre: 'Revisión de Contribuyentes',
        type: 'item',
        icono: 'circle',
        url: 'legal/contributing-companies'
      },
      {
        id: 'actasfiscales',
        nombre: 'Actas Fiscales',
        type: 'item',
        icono: 'circle',
        // url: 'financial-collection/contributing-companies'
      },
    ]
  },
    // Proyectos
    // {
    //   id: 'Proyectos',
    //   nombre: 'Proyectos',
    //   title: 'Proyectos',
    //   role: ['7', '9'],
    //   type: 'collapsible',
    //   icono: 'folder',
    //   children: [
    //     // {
    //     //   id: 'contribuyentes',
    //     //   nombre: 'Contribuyentes',
    //     //   type: 'item',
    //     //   icono: 'circle',
    //     //   url: 'digital-documentation/taxpayers'
    //     // },
    //   ]
    // },
  // Reportes y Alertas
  {
    id: 'reportes-alertas',
    nombre: 'Reportes y Alertas',
    title: 'Reportes y Alertas',
    type: 'collapsible',
    role: ['9'],
    icono: 'alert-triangle',
    children: [
      {
        id: 'gestion-Alertas',
        nombre: 'Gestión Alertas',
        type: 'item',
        icono: 'circle',
        url: 'reports-alerts/alert-management'
      },
      {
        id: 'definicion-alertas',
        nombre: 'Definición Alertas',
        type: 'item',
        icono: 'circle',
        url: 'reports-alerts/definition-alerts'
      },
      {
        id: 'configuracion-usuarios-alertados',
        nombre: 'Configuración Usuarios Alertados',
        type: 'item',
        icono: 'circle',
        url: 'reports-alerts/alerted-users-configuration'
      },
      {
        id: 'reportes-dinamicos',
        nombre: 'Reportes Dinamicos',
        type: 'item',
        icono: 'circle',
        url: 'reports-alerts/dinamic-reports'
      },
      {
        id: 'reportes-estaticos',
        nombre: 'Reportes Estaticos',
        type: 'item',
        icono: 'circle',
        url: 'reports-alerts/static-reports'
      }
    ]
  },
  // Soporte
  {
    id: 'soporte',
    nombre: 'Soporte',
    title: 'Soporte',
    type: 'collapsible',
    icono: 'tool',
    // hidden: true,
    role: ['9'],
    children: [
      // {
      //   id: 'modulosmenus',
      //   nombre: 'Modulos Menus',
      //   type: 'item',
      //   icono: 'circle',
      //   url: 'support/menu-module',
      // },
      {
        id: 'rolesusuarios',
        nombre: 'Roles de Usuarios',
        type: 'item',
        icono: 'circle',
        url: 'support/role-user'
      },
      {
        id: 'permisosusuarios',
        nombre: 'Permisos de Usuarios',
        type: 'item',
        icono: 'circle',
        url: 'support/permissions-user'
      },
      {
        id: 'gestiontablas',
        nombre: 'Gestion Tablas',
        type: 'item',
        icono: 'circle',
        url: 'support/table-management'
      },
      {
        id: 'cambiarcontraseña',
        nombre: 'Cambiar Contraseña',
        type: 'item',
        icono: 'circle',
        url: 'support/change-password'
      },
      {
        id: 'backups',
        nombre: 'Copias de Seguridad',
        type: 'item',
        icono: 'circle',
        url: 'support/backups'
      }
    ]
  },
];
