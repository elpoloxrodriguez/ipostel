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
    role: ['1','2'], 
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
    title: 'Pagos',
    role: ['1','2'],
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
  // Reportes
  {
    id: 'reports',
    nombre: 'Reportes',
    role: ['1'], 
    icono: 'list',
    type: 'item',
    url: 'reports/report',
  },

  // MENU ADMINISTRACION
  {
    id: 'list-opp',
    nombre: 'OPP',
    title: 'OPP',
    role: ['3'],
    type: 'collapsible',
    icono: 'list',
    children: [
      {
        id: 'list-opp',
        nombre: 'Lista OPP',
        type: 'item',
        icono: 'circle',
        url: 'management/private-postal-operator'
      },
    ]
  },
  //  REPORTES
  {
    id: 'reports',
    nombre: 'Reportes',
    icono: 'bar-chart-2',
    type: 'item',
    role: ['3'],
    url: 'admin-reports/admin-reports',
  },
    //  ACTUALIZACION DE SISTEMA
    {
      id: 'update-system',
      nombre: 'Actualizar SIRPV',
      icono: 'refresh-ccw',
      type: 'item',
      role: ['3'],
      url: 'update-system/system-pull',
    },
];
