module.exports = {
    port: process.env.PORT || 3000,
    mongoose.connect(process.env.MONGODB_URI || mongodb+srv://vasquez:16210586@cluster0.gvflt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority),
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
}