function load(component) {
    return resolve => require([`views/${component}`], resolve);
}

const routes = [
    {
        path: '/main',
        name: 'main',
        component: load('Main'),
        meta: {
            title: '主页'
        }
    },
    {
        path: '/',
        name: 'home',
        component: load('Home'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '*',
        redirect: {
            path: '/'
        }
    }
];
export default routes;
