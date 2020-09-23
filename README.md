# National Park List Client
Find National Parks in the United States that you want to visit and save parks to a list that you create.

This repo is the front-end client, built in React.  You can see the app live at [https://nationalparklist-client.vercel.app/](https://nationalparklist-client.vercel.app/)

The app is meant for desktop use, but will still scale for tablet and mobile viewing.

To check out the app, you can use the following dummy account to see the onboarding experience:

#### Demo Account Details

* email: sampleuser@sampleuser.com
* password: foobar

## Introduction

With so much information available on the web having a clear and concise encapsulation of what National Parks exist in a given area can be tough to find, sometimes there is a National Park nearby that you never knew about. National Park List uses the National Park Service API and the Open Weather API to provide you with up to date information about parks, current weather, activities, map coordinates, contact information and all other pertinent information you may be looking for. If you want to find a new and exciting National Park - National Park List is your plan.

## Screenshots

| Home       | About       | Search     | Parks       |
|------------|-------------|------------|-------------|
| <img src="/public/home.png" width="250"> | <img src="/public/about.png" width="250"> | <img src="/public/search.png" width="250"> | <img src="/public/parks.png" width="250"> |

## Technology

#### Front End

* React
  * Create React App
  * React Router
* HTML5
* CSS3 (scratch - no frameworks)

#### Testing

* Jest (screen captures & smoke tests)

#### Production

* Deployed via Vercel

## Getting Started

1. Get api keys for the following two APIs:
National Park Service: https://www.nps.gov/subjects/developer/get-started.htm
Open Weather API (Free account): https://openweathermap.org/price

2. Create a `.env` and `.env.local` file in the project root and put the following in each file:
REACT_APP_API_KEY='api_key=`<NPS API KEY GOES HERE>`'
REACT_APP_API_KEY_TWO=`<HEROKU API KEY GOES HERE>`
REACT_APP_OPENWEATHER_API_KEY='appid=`<OPENWEATHER API KEY GOES HERE>`'

3. Run `npm install` to load dependencies

4. Run `npm test` to ensure a stable build

This is only the front end client, so develop locally you'll need the backend server as well.

To get the backend up and running see CURRENTLY DEAD LINKS --> [https://github.com/nelsandersoncreative/nationalparklist-server](https://github.com/nelsandersoncreative/nationalparklist-server)

Deployments are handled through Vercel and can be run via `npm run deploy`








This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
