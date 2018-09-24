# Neighborhood Map Project

## Overview

Neighborhood Map project is single-page application using React featuring a map of specific neighborhood or a neighborhood you would like to visit and part of Front-End Web Developer Nanodegree Program by Udacity.This project was bootstrapped with Create React App.

## About The Project

 We need to write code to display map markers identifying at least 5 locations that we are interested in within our neighborhood.

 The app should display those locations by default when the page is loaded.
 Implement a list view of the set of locations you have defined.

 The map markers displayed by default on load. The list view and the markers should update accordingly in real time.

 Add functionality using third-party APIs (Four Square API) to provide information when a map marker or list view entry is clicked.

 Selecting a location via list item or map marker should cause the map marker to bounce. This indicates that the location has been selected, and an associated info window should open above the map marker with additional information

## Asynchronicity and Error Handling

All data API's used in the application should load asynchronously, and errors should be handled gracefully. In case of error, A message is displayed that notifies the user that the data cannot be loaded.


## How To Run This Project

1. Clone repository to local machine using
   $ git clone https://github.com/AliIsmeal/neighborhood-map.github.io.git
2. if npm not installed on your machine you need to install it, run $ npm install
3. $ npm start
4. visit the site: http://localhost:300

### Offline-First Considerations

1.  Service workers [require HTTPS](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers#you_need_https),
    although to facilitate local testing, that policy
    [does not apply to `localhost`](http://stackoverflow.com/questions/34160509/options-for-testing-service-workers-via-http/34161385#34161385).
    If your production web server does not support HTTPS, then the service worker
    registration will fail, but the rest of your web app will remain functional.
1.  Service workers are [not currently supported](https://jakearchibald.github.io/isserviceworkerready/)
    in all web browsers. Service worker registration [won't be attempted](src/registerServiceWorker.js)
    on browsers that lack support.
1.  The service worker is only enabled in the [production environment](#deployment),
    e.g. the output of `npm run build`. It's recommended that you do not enable an
    offline-first service worker in a development environment, as it can lead to
    frustration when previously cached assets are used and do not include the latest
    changes you've made locally.
1.  If you _need_ to test your offline-first service worker locally, build
    the application (using `npm run build`) and run a simple http server from your
    build directory. After running the build script, `create-react-app` will give
    instructions for one way to test your production build locally and the [deployment instructions](#deployment) have
    instructions for using other methods. _Be sure to always use an
    incognito window to avoid complications with your browser cache._
1.  If possible, configure your production environment to serve the generated
    `service-worker.js` [with HTTP caching disabled](http://stackoverflow.com/questions/38843970/service-worker-javascript-update-frequency-every-24-hours).
    If that's not possible—[GitHub Pages](#github-pages), for instance, does not
    allow you to change the default 10 minute HTTP cache lifetime—then be aware
    that if you visit your production site, and then revisit again before
    `service-worker.js` has expired from your HTTP cache, you'll continue to get
    the previously cached assets from the service worker. If you have an immediate
    need to view your updated production deployment, performing a shift-refresh
    will temporarily disable the service worker and retrieve all assets from the
    network.
1.  if user not familiar with offline-first web apps
    [Ckick here](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux#inform_the_user_when_the_app_is_ready_for_offline_consumption)
    when the service worker has finished populating your caches (showing a "This web
    app works offline!" message) and also let them know when the service worker has
    fetched the latest updates that will be available the next time they load the
    page (showing a "New content is available; please refresh." message). Showing
    this messages is currently left as an exercise to the developer, but as a
    starting point, you can make use of the logic included in [`src/registerServiceWorker.js`](src/registerServiceWorker.js), which
    demonstrates which service worker lifecycle events to listen for to detect each
    scenario, and which as a default, just logs appropriate messages to the
    JavaScript console.
1.  By default, the generated service worker file will not intercept or cache any
    cross-origin traffic, like HTTP [API requests](#integrating-with-an-api-backend),
    images, or embeds loaded from a different domain. If you would like to use a
    runtime caching strategy for those requests, you can [`eject`](#npm-run-eject)
    and then configure the
    [`runtimeCaching`](https://github.com/GoogleChrome/sw-precache#runtimecaching-arrayobject)
    option in the `SWPrecacheWebpackPlugin` section of
    [`webpack.config.prod.js`](../config/webpack.config.prod.js).

## Resources

1. [React Google Maps Style Guide](https://tomchentw.github.io/react-google-maps/)
2. [How To Render A Map Component Using ‘react-google-maps’](https://medium.com/@yelstin.fernandes/render-a-map-component-using-react-google-maps-5f7fb3e418bb)
3. [How to Write a Google Maps React Component](https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/)

## Dependencies

1. [ReactJs](https://reactjs.org/)
2. [Google Maps API](https://cloud.google.com/maps-platform/)
3. [Four Square](https://developer.foursquare.com/)
4. [google-maps-react](https://www.npmjs.com/package/google-maps-react)
