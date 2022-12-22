import { Router } from "@vaadin/router";

const root = document.querySelector(".root");

const router = new Router(root);

router.setRoutes([
	{ path: "/", redirect: "/home" },
	{ path: "/home", component: "home-page" },
	{ path: "/search", component: "search-page" },
]);
