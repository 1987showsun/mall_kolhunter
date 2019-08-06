import Home from "../pages/home";
import Terms from '../pages/terms';
import Categories from '../pages/categories';
import Detail from '../pages/detail';
import Approach from '../pages/approach';
import Store from '../pages/store';
import StoreInfo from '../pages/store/info';
import ontSignIn from '../pages/login';
import IncIndex from '../pages/vendor';
import AccountIndex from '../pages/account';

const common = [
  {
    path: "/",
    exact: true,
    component: Home
  },
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
    path: "/detail/:id",
    exact: true,
    component: Detail
  },
  {
    path: "/detail",
    exact: true,
    component: Detail
  },
  {
    path: "/approach/:id",
    exact: true,
    component: Approach
  },
  {
    path: "/approach",
    exact: true,
    component: Approach
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
  }
];

export default [ ...common ];
