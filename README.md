# AngularBaseProject + Node
This base project implements Angular 1 served with Node.js. Uses Semantic-UI as CSS Library.

# Server Side

## Installing dependencies
To install all dependencies for this project you have to run `npm start` in your console. This action will run an `npm install` and `bower install`.

This project uses the follow dependencies for Node server:
  - client-sessions
  - cookie-parser
  - express
  - gulp
  - gulp-concat
  - gulp-cssmin
  - gulp-htmlmin
  - gulp-uglify

This project uses the follow dependencies for Frontend:
  - jquery
  - semantic
  - angular
  - restangular
  - angular-ui-router
  - oclazyload
  - gulp-htmlmin
  - gulp-uglify

## Generating frontend files with Gulp
To generate the files for the web application you have to run the command `gulp build`. The gulpfile is into the gulp folder, you have to `cd gulp` before to run the gulp command.

### Watching files
To watch files for automatic generating you have to run `gulp build watch`. The files the will been watching are:
  - All the CSS files into `src/css` folder except for `style.css` and `vendor.css`.
  - All the JS files matching with `src/js/**/*.js`.
This configuration can be changed from the configuration file `gulp/files/watch.json`.

## Running project
Start node server running the command `node app.js`. This will create a node server listening on port defined into configuration file `config/*environment*`. The default environment is `develop`.

# Frontend Side

## Configuring backend services routes
This project uses `Restangular` angular module to call API services.

To set the base route is on the angular configuration files placed on `src/js/config/core.config.js`, on line:
```javascript
RestangularProvider.setBaseUrl('https://my.services.com');
```

## Creating a new module
A module is a package that holds the views and controllers. A modules can be:
  - Posts
  - Friends
  - Photos

To define a new module you have to create a new folder with your module name into `src/modules`. The common views into a module are `list` and `form`. The files for this view will be:
```
  form.controller.js
  form.view.html
  list.controller.js
  list.view.html
```

## Routing modules
This project uses `UI Router` as angular router. All the routes loads the html file and the controller file. The controllers are loading on demand with `OC Lazy Load`.

Into `src/js/config/core.config.js` file are described all the routes for the project. Each view into your module folder needs to have a route state. To create a route state you have to add a new object into `states` array as follow:
```javascript
{ name: 'stateName', fileRoute: '/module_name/view-name', url: '/module_name/view-name' }
```

Example for the common views `list` and `form` for countries:
```javascript
{ name: 'countriesList', fileRoute: '/countries/list', url: '/countries/list' },
{ name: 'countriesAdd', fileRoute: '/countries/form', url: '/countries/form' },
{ name: 'countriesEdit', fileRoute: '/countries/form', url: '/countries/form/:countryID' },
```

## Serving module files with Node.js
All the files are served with a `Node.js` server.

To give access to Node server for the files of your new module you have to create a new routes file into `routes/modules` folder. This files have to look as follow:
```javascript
[
  { "route": "/module_name/file", "file": "/modules/module_name/filename", "public": true }
]

```

Example for the common files with country module:
```javascript
[
  { "route": "/countries/list", "file": "/modules/countries/list.view.html", "public": true },
  { "route": "/js/controllers/countries/list.js", "file": "/modules/countries/list.controller.js", "public": true },
  { "route": "/countries/form", "file": "/modules/countries/form.view.html", "public": true },
  { "route": "/js/controllers/countries/form.js", "file": "/modules/countries/form.controller.js", "public": true }
]
```

## Views
The view are html files injected into `main` tag of index file. This views have to looks like:
````html
<div ng-controller="controllerName as ctrl">
  ...
</div>

```

## Controllers
Each view need a controller that are consumed by the view. This controllers are created for the `app.core` angular module. The controllers have to looks as follow:
```javascript
(function() {
  angular.module('app.core')
  .controller('controllerName', ['$scope', 'Restangular', controllerName]);

  function controllerName( $scope, Restangular ) {
    var self = this;
  }
})()

```
