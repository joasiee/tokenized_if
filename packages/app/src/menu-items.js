export default {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard/default',
                    icon: 'feather icon-home',
                }
            ]
        },
        {
            id: 'lsp',
            title: 'LSP',
            type: 'group',
            role: 'lsp',
            icon: 'icon-pages',
            children: [
                {
                    id: 'listgoods',
                    title: 'List of goods in warehousse',
                    type: 'item',
                    role: 'lsp',
                    icon: 'feather icon-package ',
                    url: '/lsp/listofgoods'
                },
                {
                    id: 'releaserequests',
                    title: 'Release requests',
                    type: 'item',
                    role: 'lsp',
                    icon: 'feather icon-help-circle',
                    url: '/lsp/releaserequests'
                },
                {
                    id: 'addshipment',
                    title: 'Add shipments',
                    type: 'item',
                    role: 'lsp',
                    icon: 'feather icon-help-circle',
                    url: '/lsp/addshipment'
                }

            ]
        },
        {
            id: 'imp',
            title: 'Importer',
            type: 'group',
            role: 'imp',
            icon: 'icon-pages',
            children: [
                {
                    id: 'impoverview',
                    title: 'Overview of items',
                    role: 'imp',
                    type: 'item',
                    icon: 'feather icon-package',
                    url: '/imp/overview'
                },
                {
                    id: 'tokenize',
                    title: 'Offer deal',
                    role: 'imp',
                    type: 'item',
                    icon: 'feather icon-volume-2',
                    url: '/imp/offer'
                },

            ]
        },
        {
            id: 'fin',
            title: 'Financier',
            role: 'fin',
            type: 'group',
            icon: 'icon-pages',
            children: [
                {
                    id: 'finoverview',
                    title: 'Overview of deals',
                    role: 'fin',
                    type: 'item',
                    icon: 'feather icon-shopping-bag',
                    url: '/fin/overview'
                },
                // {
                //     id: 'fintokens',
                //     title: 'Possesed tokens',
                //     role: 'fin',
                //     type: 'item',
                //     icon: 'feather icon-key',
                //     url: '/fin/tokens'
                // }

            ]
        },
        // {
        //     id: 'ui-element',
        //     title: 'UI ELEMENT',
        //     type: 'group',
        //     icon: 'icon-ui',
        //     children: [
        //         {
        //             id: 'basic',
        //             title: 'Component',
        //             type: 'collapse',
        //             icon: 'feather icon-box',
        //             children: [
        //                 {
        //                     id: 'button',
        //                     title: 'Button',
        //                     type: 'item',
        //                     url: '/basic/button'
        //                 },
        //                 {
        //                     id: 'badges',
        //                     title: 'Badges',
        //                     type: 'item',
        //                     url: '/basic/badges'
        //                 },
        //                 {
        //                     id: 'breadcrumb-pagination',
        //                     title: 'Breadcrumb & Pagination',
        //                     type: 'item',
        //                     url: '/basic/breadcrumb-paging'
        //                 },
        //                 {
        //                     id: 'collapse',
        //                     title: 'Collapse',
        //                     type: 'item',
        //                     url: '/basic/collapse'
        //                 },
        //                 {
        //                     id: 'tabs-pills',
        //                     title: 'Tabs & Pills',
        //                     type: 'item',
        //                     url: '/basic/tabs-pills'
        //                 },
        //                 {
        //                     id: 'typography',
        //                     title: 'Typography',
        //                     type: 'item',
        //                     url: '/basic/typography'
        //                 }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     id: 'ui-forms',
        //     title: 'Forms & Tables',
        //     type: 'group',
        //     icon: 'icon-group',
        //     children: [
        //         {
        //             id: 'form-basic',
        //             title: 'Form Elements',
        //             type: 'item',
        //             url: '/forms/form-basic',
        //             icon: 'feather icon-file-text'
        //         },
        //         {
        //             id: 'bootstrap',
        //             title: 'Table',
        //             type: 'item',
        //             icon: 'feather icon-server',
        //             url: '/tables/bootstrap'
        //         }
        //     ]
        // },
        // {
        //     id: 'chart-maps',
        //     title: 'Chart & Maps',
        //     type: 'group',
        //     icon: 'icon-charts',
        //     children: [
        //         //     {
        //         //         id: 'charts',
        //         //         title: 'Charts',
        //         //         type: 'item',
        //         //         icon: 'feather icon-pie-chart',
        //         //         url: '/charts/nvd3'
        //         //     },
        //         //     {
        //         //         id: 'maps',
        //         //         title: 'Map',
        //         //         type: 'item',
        //         //         icon: 'feather icon-map',
        //         //         url: '/maps/google-map'
        //         //     }
        //     ]
        // },
        {
            id: 'admin',
            title: 'Admin',
            type: 'group',
            icon: 'icon-pages',
            children: [
                {
                    id: 'profile',
                    title: 'Profile',
                    type: 'item',
                    icon: 'feather icon-user',
                    url: '/profile'
                },

            ]
        }
    ]
}