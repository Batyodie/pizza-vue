<h1 align="center">
    <img alt="Vue Pizza" src="https://res.cloudinary.com/pizza-vue/image/upload/v1613116671/vue-pizza-logo_nbnxia.png" />
</h1>

<h4 align="center">
  front-end app for pizza shopping.
</h4>
<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Batyodie/pizza-vue">
  
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Batyodie/pizza-vue">
  
  <img alt ="Jest coverage badge-lines" src="https://res.cloudinary.com/pizza-vue/image/upload/v1613118114/badge-lines_ldwyxp.svg">
  
  <img alt="Jest coverage bage-statements" src="https://res.cloudinary.com/pizza-vue/image/upload/v1613119606/badge-statements_cysexq.svg">

  <img alt="Code size" src="https://img.shields.io/github/languages/code-size/Batyodie/pizza-vue">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/Batyodie/pizza-vue">
  
   <img alt="w3c validation" src="https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fpizza-vue.herokuapp.com">
  
  
</p>

<p align="center">
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#airplane-how-to-deploy">How to Deploy</a>&nbsp;&nbsp;&nbsp;|&nbsp;
   &nbsp;&nbsp;
  <a href="#eyes-original-design">Original design</a>&nbsp;&nbsp;&nbsp;|&nbsp;
  &nbsp;&nbsp;
  <a href="#hammer-directory-structure">Directory Structure</a>&nbsp;&nbsp;&nbsp;|&nbsp;
  &nbsp;&nbsp;
  <a href="#arrow_right_hook-Hooks">Hooks</a>&nbsp;&nbsp;&nbsp;|&nbsp;
  &nbsp;&nbsp;
  <a href="#pushpin-scripts">Scripts</a>&nbsp;&nbsp;&nbsp;|&nbsp;
   &nbsp;&nbsp;
  <a href="https://pizza-vue.herokuapp.com/">Preview</a>
</p>

![App Screenshot](https://res.cloudinary.com/pizza-vue/image/upload/v1613117898/vue-pizza-update_w99xbc.png)
![App Screenshot](https://res.cloudinary.com/pizza-vue/image/upload/v1613117897/vue-pizza-basket-update_ygm11n.png)
![App Screenshot](https://res.cloudinary.com/pizza-vue/image/upload/v1613117897/vue-pizza-basket2-update_rnrw1f.png)
![App Screenshot](https://res.cloudinary.com/pizza-vue/image/upload/v1613117897/vue-pizza-mobile_ynp8bm.png)

## :rocket: Technologies

This project was developed using the following technologies:

- [Vue.js](https://vuejs.org/)
- [Vue CLI is a full system for rapid Vue.js development](https://cli.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [Vue Router](https://router.vuejs.org/ru/)
- [Css modules](https://github.com/css-modules/css-modules)
- [Axios](https://github.com/axios/axios)
- [Post-css](https://postcss.org/)
- [Immer](https://github.com/immerjs/immer)
- [Vue Test Utils](https://vue-test-utils.vuejs.org/)
- [Husky hooks](https://github.com/typicode/husky)
- [Css Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [Json-server](https://github.com/typicode/json-server)
- [Prettier, Babel, Eslint. Options for Vue CLI](https://cli.vuejs.org/core-plugins/babel.html#vue-cli-plugin-babel)

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v10.16][nodejs] or higher + [npm 6.14.8](https://www.npmjs.com/) or higher installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Batyodie/pizza-vue.git

# Go into the repository
$ cd pizza-vue

# Install dependencies
$ npm install

# Run the app
$ npm run dev
```

## :airplane: How to Deploy

The example deployment will take place on the [heroku](https://dashboard.heroku.com/) platform, because it has the ability to work with [node.js][nodejs] and for the application it is necessary.

1. Register on [heroku](https://dashboard.heroku.com/)
2. We create a new project (new-vue-pizza)
3. Linking your github profile to a new project
4. Add a cloned repository with a project
   Choose which branch heroku will deploy (by default, this is master.)
   Turn on automatic deployment
5. Create a file called `server.js` at the root of the cloned project

```bash
# server.js

# our back-end in the role of json-server
const jsonServer = require("json-server");
const server = jsonServer.create();

# router path to our database
const router = jsonServer.router("./public/db.json");

# static files
const middlewares = jsonServer.defaults({
  static: "./dist"
});

# Port to which heroku will refer
const PORT = process.env.PORT || 3001;

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  console.log("Server is running");
});

```

6. Create a file called `Procfile`. He explains to heroku what he needs to start to work correctly

```bash
# Procfile file

#heroku run server.js file
web: node server.js

```

7. Save changes and update master branch `git add . / git commit / git push`

## :arrow_right_hook: Hooks

Make some change in the files

```bash
$ git add . # add all the changes made

$ git commit -m "keep clam and commit" # create commit

# then there is a check and autofix with a linter. Next, run tests. If no errors are found, run a post-commit which will push the changes to github

# if you want to send a commit without any checks use --no-verify
$ git commit -m "keep clam and commit" --no-verify

# Hooks can be changed or removed in package.json
 "husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm run test:unit",
      "post-commit": "git push"
    }
  },

```

## :pushpin: Scripts

```bash
$ npm run serve # running vue app

$ npm run build # starting application build

$ npm run test:unit # running unit tests. If during separate work with tests, you will need to keep them on at all times. Add the --watch flag

$ npm run lint # lint check runs

$ npm run json-server # back-end server launch

$ npm run dev # simultaneous launch of vue application and back-end server for convenient work and full-fledged application work

```

## :hammer: Directory Structure

```bash

├── src
│   ├── api # api for communicate to fake json-server through axios
│   │   ├── __tests__
│   │   ├── **/*.api.js
│   ├── assets # static asstes
│   │   ├── fonts/img
│   ├── components # component catalog
│   │   ├── Button
│   │   │    ├── __tests__
│   │   │    │      ├── Button.spec.js
│   │   │    │      ├── __snapshots__
│   │   │    ├── Button.css
│   │   │    ├── Button.vue
│   ├── func # exported functions for working in the store
│   │   ├── __tests__
│   │   ├── getCardData.js
│   ├── Layout # Layouts directory
│   │   ├── TheGrid
│   │   │    ├── __tests__
│   │   │    │      ├── LayoutTheGrid.spec.js
│   │   │    │      ├── __snapshots__
│   │   │    ├── LayoutTheGrid.css
│   │   │    ├── LayoutTheGrid.vue
│   ├── router
│   │   ├── index.js # master file for routers
│   ├── store # Store catalog
│   │   ├── modules # subsection with modules
│   │   │    ├── cart
│   │   │    │      ├── __tests__
│   │   │    │      │      ├── cart.spec.js
│   │   │    │      ├── basket # basket sub-module responsible for the basket   operation on the Basket page
│   │   │    │      │      ├── action.js
│   │   │    │      │      ├── index.js
│   │   │    │      │      ├── mutation.js
│   │   │    │      │      ├── __tests__.js
│   │   │    │      ├── cart.js # basic basket module
│   │   ├── index.js # main store file
│   │   ├── mutation-types.js # imported mutation types
│   ├── style
│   │   ├── Base # base styles
│   │   │    ├── App
│   │   │    │   ├── BaseApp.css # basic styles for the application
│   │   │    ├── Extend # styles for extend
│   │   │    ├── Fonts # styles for fonts
│   │   │    ├── Reset # styles to reset
│   │   │    ├── Vars # styles for variables
│   │   │    ├── import.css # file for importing base styles
│   │   ├── main.css # main css file
│   ├── views # directory where application pages are located
│   │   ├── Basket
│   │   │    ├── Basket.css
│   │   │    ├── Basket.vue
│   │   ├── Market
│   ├── App.vue # root vue app
│   └── Main.js # main js app
├── dist (or build)
├── node_modules
├── public
│   │   ├── db.json # database products
│   │   ├── index.html
├── .eslintrc.js
├── README.md
├── package.json
├── babel.config.js
├── jest.config.js
├── postcss.config.js
├── Procfile # heroku config
├── server.js # node server for deploy
├── vue.config.js
├── .browserslistrc
└── .gitignore

```

## :eyes: Original design

[Design in figma](https://www.figma.com/file/wWUnQwvRDWBfPx1v1pCAfO/React-Pizza?node-id=0%3A1)

---

[nodejs]: https://nodejs.org/
