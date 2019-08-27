import Product from './pages/product';
import Store from './pages/store';
import Fansorders from './pages/fansorders';
import Bank from './pages/bank';

export default [
    {
        path: '/mystore',
        exact: true,
        component: Product
    },
    {
        path: '/mystore/product',
        exact: true,
        component: Product
    },
    {
        path: '/mystore/store',
        component: Store
    },
    {
        path: '/mystore/fansorders',
        component: Fansorders
    },
    {
        path: '/mystore/bank',
        component: Bank
    }
]