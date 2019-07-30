import Home from "../pages/home";
import Terms from '../pages/terms';
import Categories from '../pages/categories';
import Info from '../pages/info';
import Store from '../pages/store';
import StoreInfo from '../pages/store/info';
import ontSignIn from '../pages/login';
import IncIndex from '../pages/vendor';
import AccountIndex from '../pages/account';

const common = [
  {
    path: "/terms",
    exact: true,
    component: Terms
  },
  {
    path: "/terms/:class",
    exact: true,
    component: Terms
  },
  {
    path: "/info/:id",
    exact: true,
    component: Info
  },
  {
    path: "/info",
    exact: true,
    component: Info
  },
  {
    path: "/store/:id",
    component: StoreInfo
  },
  {
    path: "/store",
    exact: true,
    component: Store
  },
  {
    path: "/categories/:main/:sub",
    component: Categories
  },
  {
    path: "/categories/:main",
    component: Categories
  },
  {
    path: "/categories",
    exact: true,
    component: Categories
  },
  {
    path: "/myvendor",
    component: IncIndex
  },
  {
    path: "/myaccount",
    component: AccountIndex
  },
  {
    path: "/account/:class",
    component: ontSignIn
  },
  {
    path: "/account",
    exact: true,
    component: ontSignIn
  },
  {
    path: "/vendor/:class",
    component: ontSignIn
  },
  {
    path: "/vendor",
    exact: true,
    component: ontSignIn
  },
  {
    path: "/",
    exact: true,
    component: Home
  }
];

export default [ ...common ];
