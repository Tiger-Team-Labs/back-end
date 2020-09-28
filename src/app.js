import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import pkg from '../package.json'

import {createRoles} from './libs/initialSetup'

import categoriesRoutes from './routes/categories.routes'
import usersRoutes from './routes/user.routes'
import postsRoutes from './routes/posts.routes'
import authRoutes from './routes/auth.routes'

const app = express();
createRoles();

// settings
app.set('pkg', pkg);

// middlewares
const corsOptions = {
    origin: "https://bernardoaguayoortega.github.io"
    //origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

// welcome routes
app.get('/', (req, res) => {
    res.json({
        author: app.get('pkg').author,
        name: app.get('pkg').name,
        description: app.get('pkg').description,
        version: app.get('pkg').version 
    })
})

// routes
app.use('/api/categories', categoriesRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/auth', authRoutes)

export default app;