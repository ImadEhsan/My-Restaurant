import express from 'express';
import { createUser, getAllUser, loginUser, logoutUser } from '../controller/userController.js';

const routesuser = express.Router();

routesuser.route('/signup').post(createUser)
routesuser.route('/login').post(loginUser)
routesuser.route('/getusers').get(getAllUser)
routesuser.route('/logout').post(logoutUser)

export default routesuser;  // Exporting the routes module for use in the server.js file.  This allows for easy sharing of routes across multiple files.  Note: The routes are not being exported in the index.js file, but rather in this file.  This is a best practice.  The index.js file is where you combine all your routes into a single file for easier management and organization.  The server.js file is where you set up the server
