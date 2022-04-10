import Main from "@/pages/Main";
import {createRouter, createWebHashHistory} from "vue-router";
import PostPage from "@/pages/PostPage";
import About from "@/pages/About";
import PostIdPage from "@/pages/PostIdPage";

const routes = [
    {
        path: '/',
        component: Main,
    },
    {
        path: '/posts',
        component: PostPage,
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/post/:id',
        component: PostIdPage,
    },
];

const router = createRouter({
   routes,
   history: createWebHashHistory(process.env.BASE_URL),
});

export default router;