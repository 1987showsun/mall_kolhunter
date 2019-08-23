import Dashbord from './pages/dashbord';
import Categories from  './pages/categories';
import Info from './pages/info';
import Create from './pages/create';
import Review from './pages/review';
import Program from './pages/program/payment';
import Payment from './pages/program/items';
import Profile from './pages/profile'

export default [
    {
        path: '/myvendor/program',
        component: Program
    },
    {
        path: "/myvendor/payment",
        exact: true,
        component: Payment
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
        path: "/myvendor/categories/:type/review",
        component: Review
    },
    {
        path: "/myvendor/categories/:type",
        exact: true,
        component: Categories
    },
    {
        path: "/myvendor/categories",
        exact: true,
        component: Categories
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