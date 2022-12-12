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
      id: 'EmpresaOPP',
      nombre: 'Empresa',
      // role: ['0','9'], 
      icono: 'package',
      type: 'item',
      url: 'business/opp',
    },
  // Franqueo Postal
  {
    id: 'FanqueoPostal',
    nombre: 'Franqueo Postal',
    title: 'Franqueo Postal',
    role: ['0'],
    type: 'collapsible',
    icono: 'file-text',
    children: [
      {
        id: 'TablaPrecios',
        nombre: 'Tabla de Tarifas',
        type: 'item',
        icono: 'circle',
        url: 'postage/price-table'
      },
      {
        id: 'MovementOfParts',
        nombre: 'Declaración de Piezas',
        type: 'item',
        icono: 'circle',
        url: 'postage/postage-per-month'
      }
    ]
  },
      // Subcontratistas Postal
      {
        id: 'Subcontratistas',
        nombre: 'Subcontratistas',
        // role: ['0','9'], 
        icono: 'users',
        type: 'item',
        url: 'business/subcontractor',
      },
    // Pagos Postal
    {
      id: 'PagosPostales',
      nombre: 'Pagos',
      title: 'Pagos',
      role: ['0'],
      type: 'collapsible',
      icono: 'credit-card',
      children: [
        {
          id: 'TablaPrecios',
          nombre: 'Pago Postal',
          type: 'item',
          icono: 'circle',
          url: 'payments/payments-list'
        },
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
    ]
  },
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
