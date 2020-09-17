import app from './app'
import './database'
import 'regenerator-runtime/runtime'

app.listen(process.env.PORT, '0.0.0.0');

console.log('API listen on port', 3000)