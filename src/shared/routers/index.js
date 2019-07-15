import Home from "../pages";
import Terms from '../pages/terms';
import Categories from '../pages/categories';
import ontSignIn from '../pages/login';
import IncIndex from '../pages/inc';
import incCategories from  '../pages/inc/pages/categories';
import UserIndex from '../pages/user';

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
    path: "/categories",
    exact: true,
    component: Categories
  },
  {
    path: "/inc",
    component: IncIndex
  },
  {
    path: "/user",
    component: UserIndex
  },
  {
    path: "/login",
    exact: true,
    component: ontSignIn,
    routes: [
      {
        path: "/login/:type/:class",
        component: ontSignIn
      },
      {
        path: "/login/:type",
        component: incCategories
      }
    ]
  },
  {
    path: "/",
    exact: true,
    component: Home
  }
];

export default [ ...common ];
