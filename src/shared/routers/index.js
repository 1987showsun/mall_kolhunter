import Home from "../pages";
import Terms from '../pages/terms';
import Categories from '../pages/categories';
import Info from '../pages/info';
import ontSignIn from '../pages/login';
import IncIndex from '../pages/vendor';
import MemberIndex from '../pages/member';

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
    path: "/categories/:type",
    exact: true,
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
    component: MemberIndex
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
