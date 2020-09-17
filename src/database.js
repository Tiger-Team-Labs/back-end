import mongoose from 'mongoose'
import config from "./config"

mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
.then(db => console.log('Db is connected'))
.catch(error => console.log(error))
