// router/routes.js
export const routes = {
  home: {
    path: '/',
    name: 'Home',
    icon: '🏠'
  },
};

export const navLinks = [
  { path: routes.home.path, label: routes.home.name, icon: routes.home.icon },
];