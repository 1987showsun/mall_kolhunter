import Dashbord from './pages/dashbord';
import Categories from  './pages/categories';
import Info from './pages/info';
import Update from './pages/update';
import Create from './pages/create';
import Review from './pages/review';
import Program from './pages/program';

export default [
    {
        path: '/myvendor/program',
        component: Program
    },
    {
        path: "/myvendor/update/:type",
        component: Update
    },
    {
        path: "/myvendor/payment/:type",
        component: Create
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
        path: "/myvendor",
        exact: true,
        component: Dashbord
    }
]