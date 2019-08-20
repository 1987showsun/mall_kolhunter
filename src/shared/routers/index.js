import Home from "../pages/home";
import Terms from '../pages/terms';
import Categories from '../pages/categories';
import Detail from '../pages/detail';
import Approach from '../pages/approach';
import Store from '../pages/store';
import StoreInfo from '../pages/store/info';
import ontSignIn from '../pages/login';
import MyVendor from '../pages/myvendor';
import MyAccount from '../pages/myaccount';
import MyStore from '../pages/mystore';
import SearchIndex from '../pages/search'; 

const common = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/search",
    exact: true,
    component: SearchIndex
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
    component: MyVendor
  },
  {
    path: "/myaccount",
    component: MyAccount
  },
  {
    path: "/mystore",
    component: MyStore
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
