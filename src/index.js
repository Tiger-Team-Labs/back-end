import app from './app'
import './database'
import config from "./config"
import 'regenerator-runtime/runtime'

//app.listen(3000)
//app.listen(process.env.PORT, '0.0.0.0');
app.listen(config.PORT, '0.0.0.0');

console.log('API listen on port', 3000)