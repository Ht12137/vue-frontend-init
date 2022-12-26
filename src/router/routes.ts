const routes = [
    {
        path: "/",
        redirect:'/login'
    },

    {
        path: "/test",
        component:import("../layouts/test/TestPage.vue")
    },
    {
        path: "/login",
        component:import("../layouts/login/LoginPage.vue")
    }
]

export default routes;