import Dashbord from './pages/dashbord/';
import Products from './pages/products';
import Orders from './pages/orders';
import Accounts from './pages/accounts';
import Profile from './pages/profile';
import Planform from './pages/planform';

export default [
    {
        path: '/myvendor/planform',
        component: Planform
    },
    {
        path: "/myvendor/products",
        component: Products
    },
    {
        path: "/myvendor/orders",
        component: Orders
    },
    {
        path: "/myvendor/accounts",
        component: Accounts
    },
    {
        path: "/myvendor/profile/:type",
        exact: true,
        component: Profile
    },
    {
        path: "/myvendor/profile",
        exact: true,
        component: Profile
    },
    {
        path: "/myvendor/dashboard",
        component: Dashbord
    }
]