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
    <h1>Labobook</h1>
    <ul>
      <a href="/posts">Vamo pal muro</a>
      <a href="/new-post">Vamo a crear un post</a>
      <a href="/tacos">Vamo x tacos</a>
    </ul>
  `;
}

function Posts() {
  const posts = JSON.parse(window.localStorage.getItem('posts')) || [];

  const postsList = posts.map(post => {
    return `<li>${post.content} - ${post.publishDate}</li>`;
  }).join(''); // '<li></li><li></li>'
  return `
    <a href="/new-post">Nuevo post</a>
    <ul>
      ${postsList}
    </ul>
  `;
}

function NewPost() {
  return `
    <form id="form" onsubmit="addPost(event)">
      <textarea id="content"></textarea>
      <button type="submit">Postear! 👍</button>
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

document.body.addEventListener('click', (event) => {
  if (event.target.nodeName === 'A') {
    event.preventDefault();

    const title = event.target.textContent;
    const url = event.target.href;
    // redireccionar (cambiar la URL)
    window.history.pushState(/** state */ {}, title, url);
    window.dispatchEvent(new Event('popstate'));
  }
});

window.addEventListener('popstate', function() {
  const component = getComponentFromRoute(routes);
  render(component);
});

function addPost(event) {
  event.preventDefault();

  const addPostToDB = (post) => {
    posts.push(post);
    
    window.localStorage.setItem('posts', JSON.stringify(posts));
    window.history.pushState(/** state */ {}, 'Posts', '/posts');
    window.dispatchEvent(new Event('popstate'));
  };
  
  const content = document.getElementById('content').value;
  let posts = JSON.parse(window.localStorage.getItem('posts')) || [];

  const post = {
    content,
    publishDate: new Date(),
  };

  addPostToDB(post);
}