import Home from "../components/Home";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Fixtures from "../components/Fixtures";
import Teams from "../components/Teams";
import CreateFixture from "../components/CreateFixture";
import CreateTeam from "../components/CreateTeam";
import Dashboard from "../components/Dashboard";

export default [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: SignUp
  },
  {
    path: "/teams",
    name: "teams",
    component: Teams
  },
  {
    path: "/create-team",
    name: "create-team",
    component: CreateTeam
  },
  {
    path: "/create-fixture",
    name: "create-fixture",
    component: CreateFixture
  },
  {
    path: "/admin",
    name: "admin",
    component: Dashboard
  },
  {
    path: "/fixtures",
    name: "fixtures",
    component: Fixtures
  },
];