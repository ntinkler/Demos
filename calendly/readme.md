# Calendly Demo

This is a small demo of registering webhooks using the calendly api. My personal
goals for this project were as follows:

goals
* (DONE) Use modern es6/7 javascript to create a simple Express web server for nodejs 
    * (DONE) Requirement - Must log access details to disk 
    * (DONE) Bonus - Also log errors/warnings to console 

* (DONE) Serve the project on one of  AWS/Azure/GCE for less than a dollar a day 
    * (DONE) Bonus - debug/test without any external resources (all local) 
    * (DONE) Bonus - deploy using Kubernetes (K8s) (DONE)

* (DONE) Support debugging using VS Code. 
    * (DONE) Requirement - breakpoints and variable values
    * (DONE) Bonus - Launch directly from vs code instead of attaching

* (DONE) Prefer module syntax over require()
    * (PARTIAL - Tests require transpiler) Bonus - do this without using a transpiler (ex: babel)

* (DONE) Successfully test the project with a well-known framework

* (DONE) Use MongoDb as the data store

* (DONE) Create a minimal extension that polls the web service and displays user feedback

## Getting Started

This project is compatible with Windows/Mac/Linux.

The simplest way to test/run this project is to install docker and docker-compose.

Once installed, you can both host and test this application by running

`docker-compose build`

`docker-compose up -d`

__NOTE: the following ports must be unmapped on your localhost__
* __8080__
* __8081__
* __27017__

This will start 4 containers:
* node-demo
* node-test (exits after tests complete)
* mongo
* mongo-express

The project itself is hosted on port __8080__.  For sample requests please see tests/userRoute.test.mjs or tests/eventRoute.test.mjs.  To quickly verify that the server is running visit

`http://localhost:8080/api/`


Every now and then mongo does not come up quickly enough to accept connections from node-demo or node-test.  If this happens break the docker-compose up command into these two pieces

`docker-compose up -d mongo`

wait 10ish seconds.

`docker-compose up -d`



## Prerequisites

To build this project locally you will need the following
* NodeJs version 10.11.0 or above
* NPM or Yarn
* Docker and Docker-Compose

Launch profiles are provided for debugging in Visual Studio Code. 
* VS Code

## Building

To build locally you must install dependencies

`npm install`

Then you must start the required mongo instance.

`docker-compose up -d mongo`

You can optionally start the mongo-express instance to get a nice GUI for monitoring mongo at localhost:8081

`docker-compose up -d mongo-express`

afterwards you can build the project by running the npm start script

`npm start`

If you'd like to debug the project, you can use the provided launch profile for VS Code (recommended) or you can start the process manually and wait for a debugger to attach with

`npm run dev`

## Running the tests

Tests are run automatically as part of the docker-compose up process. To view test output run

`docker-compose logs -f node-test`

To run tests locally you must install required dependencies

`npm install`

Then start mongo with

`docker-compose up -d mongo`

and then run the tests script from package.json

`npm test`

Repeat the test command as needed.

## Deployment

This project includes files needed to deploy to a K8s cluster.  The intended platform is Google Cloud.  See the [GCloud Docs](https://cloud.google.com/kubernetes-engine/docs/) for more information.

## Built With

* [Node 10.11](https://nodejs.org/en/) - JS Runtime
* [Express](https://expressjs.com/) - Web Framework
* [MongoDb](https://www.mongodb.com/) - Document Store
* [Mongoose](https://mongoosejs.com/) - ODM for MongoDb
* [Docker](https://www.docker.com/) - Local testing
* [Kubernetes](https://kubernetes.io/) - Deployment

## Authors

* **Nate Tinkler** - *Initial work* - [ntinkler](https://github.com/ntinkler)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

