import Home from "../pages/home";
import Terms from '../pages/terms';
import Categories from '../pages/categories';
import Detail from '../pages/detail';
import Approach from '../pages/approach';
import Store from '../pages/store/categories';
import StoreDetail from '../pages/store/detail';
import SearchIndex from '../pages/search'; 
import Site404 from '../pages/site/404';

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
    component: StoreDetail
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
    path: "/site/404",
    component: Site404
  }
];

export default [ ...common ];
