import Dashbord from './pages/dashbord';
import Info from './pages/info';
import Create from './pages/create';
import Review from './pages/review';
import Program from './pages/program/payment';
import Products from './pages/products';
import Bill from './pages/bill';
import BillInfo from './pages/bill/pages/info';
import Orders from './pages/orders';
import Accounts from './pages/accounts';
import Profile from './pages/profile'

export default [
    {
        path: '/myvendor/program',
        component: Program
    },
    {
        path: "/myvendor/bill/:id",
        component: BillInfo
    },
    {
        path: "/myvendor/bill",
        exact: true,
        component: Bill
    },
    {
        path: "/myvendor/create/:type",
        component: Create
    },
    {
        path: "/myvendor/info/:type/:id",
        component: Info
    },
    {
        path: "/myvendor/products/create",
        exact: true,
        component: Create
    },
    {
        path: "/myvendor/products/review",
        exact: true,
        component: Review
    },
    {
        path: "/myvendor/products",
        exact: true,
        component: Products
    },
    {
        path: "/myvendor/orders",
        exact: true,
        component: Orders
    },
    {
        path: "/myvendor/accounts",
        exact: true,
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
        path: "/myvendor",
        exact: true,
        component: Dashbord
    }
]