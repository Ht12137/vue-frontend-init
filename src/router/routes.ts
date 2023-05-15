const routes = [
    {
        path: "/",
        redirect:'/test'
    },

    {
        path: "/test",
        component:import("../layouts/test/TestPage.vue")
    },
    {
        path: "/login",
        component:import("../layouts/login/LoginPage.vue")
    },

    {
        path: "/hamberger",
        component:import("../layouts/HambergerGame/HambergerGame.vue")
    }
]

export default routes;