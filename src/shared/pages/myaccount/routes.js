import Profile from './pages/profile';
import Carts from './pages/carts';
import Order from './pages/order';

export default [
    {
        path: "/myaccount",
        exact: true,
        component: Profile
    },
    {
        path: "/myaccount/profile",
        component: Profile
    },
    {
        path: "/myaccount/carts",
        component: Carts 
    },
    {
        path: "/myaccount/orders",
        component: Order
    }
]