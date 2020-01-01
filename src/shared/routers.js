/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import Home                     from "./pages/home";
import Terms                    from './pages/terms';
import Categories               from './pages/product/categories';
import Detail                   from './pages/product/detail';
import Store                    from './pages/store/categories';
import StoreDetail              from './pages/store/detail';
import SearchIndex              from './pages/search'; 
import Site404                  from './pages/site/404';
import ontSignIn                from './pages/login';
import MyVendor                 from './pages/myvendor';
import MyAccount                from './pages/myaccount';
import MyStore                  from './pages/mystore';
import Collections              from './pages/product/collections';

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
    path: "/store/:id",
    component: StoreDetail
  },
  {
    path: "/store",
    exact: true,
    component: Store
  },
  {
    path: "/collections",
    exact: true,
    component: Collections
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
    path: "/myaccount",
    component: MyAccount
  },
  {
    path: "/mystore",
    component: MyStore
  },
  {
    path: "/myvendor",
    component: MyVendor
  },
  {
    path: "/site/404",
    component: Site404
  }
];

export default [ ...common ];
