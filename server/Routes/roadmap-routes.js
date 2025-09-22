import express from 'express'
import {createPath, getPathDetails, getUserPaths, totalRoadmapGenerates} from '../Controllers/roadmap-controller.js'
import Auth from '../Middlewares/auth.js';

const app = express.Router();
app.post('/create-path',Auth, createPath)
app.get('/get-path-details/:id', Auth, getPathDetails);
app.get('/get-user-paths', Auth, getUserPaths)
app.get('/get-all-roadmaps', totalRoadmapGenerates)



export default app