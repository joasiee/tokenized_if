import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./App/pages/Dashboard/Default'));
const functionSelector = React.lazy(() => import('./App/pages/functionSelector'));
const ListOfGoods = React.lazy(() => import('./App/pages/LSP/ListOfGoods'));
const addshipment = React.lazy(() => import('./App/pages/LSP/AddShipment'));
const releaserequests = React.lazy(() => import('./App/pages/LSP/ReleaseRequests'));
const impoverview = React.lazy(() => import('./App/pages/IMP/ImpOverview'));
const announce = React.lazy(() => import('./App/pages/LSP/ReleaseRequests'));
const impwallet = React.lazy(() => import('./App/pages/LSP/ReleaseRequests'));
const finoverview = React.lazy(() => import('./App/pages/FIN/FinOverview'));
const fintokens = React.lazy(() => import('./App/pages/LSP/ReleaseRequests'));
const finwallet = React.lazy(() => import('./App/pages/LSP/ReleaseRequests'));

const routes = [
    { path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault },

    { path: '/profile', exact: true, name: 'Profile', component: functionSelector },
    { path: '/lsp/listofgoods', exact: true, name: 'List of Goods', component: ListOfGoods },
    { path: '/lsp/releaserequests', exact: true, name: 'Release requests', component: releaserequests },
    { path: '/lsp/addshipment', exact: true, name: 'Add shipments', component: addshipment },
    { path: '/imp/overview', exact: true, name: 'Importer overview', component: impoverview },
    { path: '/imp/announce', exact: true, name: 'Announce goods', component: announce },
    { path: '/imp/wallet', exact: true, name: 'Importer wallet', component: impwallet },
    { path: '/fin/overview', exact: true, name: 'Financier overview', component: finoverview },
    { path: '/fin/tokens', exact: true, name: 'Financier tokens', component: fintokens },
    { path: '/fin/wallet', exact: true, name: 'Financier wallet', component: finwallet },


];

export default routes;