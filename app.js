const getComponent = (currentPath, routes) => {
  let component = NotFound;

  routes.forEach((route) => { // { path, component }
    if (currentPath === route.path) {
      component = route.component;
    }
  });

  return component;
};

const getComponentFromRoute = (routes) => {
  const currentPath = window.location.pathname;
  const component = getComponent(currentPath, routes);
  return component;
};

const render = (component) => {
  document.getElementById('root').innerHTML = component();
};

function Home() {
  return `
    <h1>Hola mundo</h1>
  `;
}

function Posts() {
  return `
    <ul>
      <li>Un post</li>
      <li>Dos posts</li>
      <li>Tres posts</li>
      <li>Cuatro post</li>
    </ul>
  `;
}

function NewPost() {
  return `
    <form>
      <textarea></textarea>
      <button>Postear! 👍</button>
    </form>
  `;
}

function NotFound() {
  return `
    <h2>Ahorita no, joven! 👎</h2>
  `;
}


const routes = [
  { path: '/', component: Home },
  { path: '/posts', component: Posts },
  { path: '/new-post', component: NewPost }
];

const component = getComponentFromRoute(routes);
render(component);


