import Dashbord from './pages/dashbord';
import Categories from  './pages/categories';
import Info from './pages/info';
import Create from './pages/create'

export default [
    {
        path: "/inc/create/:type",
        component: Create
    },
    {
        path: "/inc/info/:type/:id",
        component: Info
    },
    {
        path: "/inc/categories/:type",
        component: Categories
    },
    {
        path: "/inc/categories",
        exact: true,
        component: Categories
    },
    {
        path: "/inc",
        exact: true,
        component: Dashbord
    }
]