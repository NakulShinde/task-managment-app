"# Task Manger App task-managment-app" 

# Front End stack Used:
- React
- Redux
- Redux-thunk
- react-routes
- CSS-Modules
- WebSocket
- Unit Testing with jest & enzyme

# Steps to configure:
- Clone repo to any directory
- cd task-managment-app
- npm install
- npm start
  - visit http://localhost:3000/ 

# API Setup (Used Docker image):
- Used docker image to consume task API here (https://hub.docker.com/r/damianofds/taskmanager-all/)
- Setup & run this docker image at your machine & update proxy set in package.json accordingly.
  
# Proxy Setup:
  - Proxy has been already set in package.json as, 
    "proxy": "http://192.168.99.100:8080"

# To run test cases
- npm test

# To create a production build, 
- npm run build.
- build folder get created in project directory with combined, minimised and compressed code.

# To server production build
- npm install -g serve
- serve -s build
- Note: Proxy set in package.json will not work in production build. You have to have API's and UI working on same domain/ip.

# Task List Page
- 1

![taskmanager-1](https://user-images.githubusercontent.com/3436316/48080809-944b8280-e214-11e8-88d9-c74dbc36bdf1.PNG)
- 2

![taskmanager-5](https://user-images.githubusercontent.com/3436316/48080898-ceb51f80-e214-11e8-8eee-7a358cbacf61.PNG)

# Task View/Update page
- 1

![taskmanager-2](https://user-images.githubusercontent.com/3436316/48080965-fa380a00-e214-11e8-99e6-94282b10ae54.PNG)
- 2

![taskmanager-6](https://user-images.githubusercontent.com/3436316/48081014-1176f780-e215-11e8-9d31-cf3a5e611145.PNG)
