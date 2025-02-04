import { CoreMenu } from '@core/types';

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  // Dashboard
  {
    id: 'dashboard/home',
    nombre: 'Principal',
    icono: 'home',
    type: 'item',
    url: 'home',
  },
  // Empresa
  {
    id: 'EmpresaOPP',
    nombre: 'Empresa',
    role: ['1', '2'],
    icono: 'package',
    type: 'item',
    url: 'business/opp',
  },
  // Franqueo Postal
  {
    id: 'FanqueoPostal',
    nombre: 'Franqueo Postal',
    title: 'Franqueo Postal',
    role: ['1'],
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
    role: ['1'],
    icono: 'users',
    type: 'item',
    url: 'business/subcontractor',
  },
  // Pagos Postal
  {
    id: 'PagosPostales',
    nombre: 'Pagos',
    role: ['1', '2'],
    icono: 'credit-card',
    type: 'item',
    url: 'payments/payments-list',
  },
  // Reportes
  {
    id: 'reports',
    nombre: 'Reportes',
    role: ['1'],
    icono: 'list',
    type: 'item',
    url: 'opp-reports/reports-ranking',
  },


  // MENU ADMINISTRACION
  // Franqueo Postal
  {
    id: 'FanqueoPostal',
    nombre: 'Tabla de Tarifas OPP',
    icono: 'file-text',
    type: 'item',
    role: ['3', '6'],
    url: 'postage/price-table-opp',
  },
  // {
  //   id: 'FanqueoPostal',
  //   nombre: 'Franqueo Postal',
  //   title: 'Franqueo Postal',
  //   role: ['3', '6'],
  //   type: 'collapsible',
  //   icono: 'file-text',
  //   children: [
  //     {
  //       id: 'TablaPrecios',
  //       nombre: 'Tabla de Tarifas OPP',
  //       type: 'item',
  //       icono: 'circle',
  //       url: 'postage/price-table-opp'
  //     },
  //   ]
  // },
  {
    id: 'list-opp',
    nombre: 'OPP-SUB',
    icono: 'list',
    type: 'item',
    role: ['3','6'],
    url: 'management/private-postal-operator',
  },
  //  REPORTES
  {
    id: 'reports',
    nombre: 'Reportes',
    icono: 'bar-chart-2',
    type: 'item',
    role: ['3', '6'],
    url: 'admin-reports/admin-reports',
  },
  //  RECAUDACION
  {
    id: 'takings',
    nombre: 'Recaudacion',
    icono: 'credit-card',
    type: 'item',
    role: ['3', '6'],
    url: 'takings/list-payments',
  },
  //  ARCHIVO DIGITAL POSTAL
  {
    id: 'digital-file-opp',
    nombre: 'Archivo Digital P',
    icono: 'folder-plus',
    type: 'item',
    role: ['3', '4', '5', '6'],
    url: 'digital-file-opp/private-postal-operator',
  },
  //  ACTUALIZACION DE SISTEMA
  {
    id: 'update-system',
    nombre: 'Actualizar SIRPV',
    icono: 'refresh-ccw',
    type: 'item',
    role: ['3', '4'],
    url: 'update-system/system-pull',
  },
  // Soporte
  {
    id: 'config',
    nombre: 'Configuración',
    title: 'Configuración',
    type: 'collapsible',
    icono: 'tool',
    // hidden: true,
    role: ['3'],
    children: [
      {
        id: 'systemHors',
        nombre: 'Estatus Sistema',
        type: 'item',
        icono: 'circle',
        url: 'settings/connection-settings'
      },
      // {
      //   id: 'permisosusuarios',
      //   nombre: 'Permisos de Usuarios',
      //   type: 'item',
      //   icono: 'circle',
      //   url: 'support/permissions-user'
      // },
      // {
      //   id: 'gestiontablas',
      //   nombre: 'Gestion Tablas',
      //   type: 'item',
      //   icono: 'circle',
      //   url: 'support/table-management'
      // },
      // {
      //   id: 'cambiarcontraseña',
      //   nombre: 'Cambiar Contraseña',
      //   type: 'item',
      //   icono: 'circle',
      //   url: 'support/change-password'
      // },
      // {
      //   id: 'users-system',
      //   nombre: 'Usuarios',
      //   type: 'item',
      //   icono: 'circle',
      //   url: 'support/users'
      // },
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
    role: ['4'],
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
        id: 'users-system',
        nombre: 'Usuarios',
        type: 'item',
        icono: 'circle',
        url: 'support/users'
      },
    ]
  },
];
