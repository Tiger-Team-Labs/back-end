import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://platzi-admin:Pq5HLvhdvBpXJX1d@curso-platzi.o7zlc.mongodb.net/foroDb?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
.then(db => console.log('Db is connected'))
.catch(error => console.log(error))
