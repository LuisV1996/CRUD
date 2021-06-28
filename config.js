module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb+srv://vasquez:16210586@cluster0.gvflt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',

    urlParser : {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
}