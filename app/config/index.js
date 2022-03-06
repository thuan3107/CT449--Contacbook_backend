const config = {
    app: {
        port: process.env.PORT || 8080,
    },

    db: {
        uri: process.env.MONGODB_URI || "mongodb+srv://thuanb1906581:01216856336tn@cluster0.fv0zk.mongodb.net/b1906581?retryWrites=true&w=majority"
    }
};

module.exports = config;