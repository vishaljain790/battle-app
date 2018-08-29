import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://battleName1992:battlePass987@ds137102.mlab.com:37102/battle-mongo-db', {
    useNewUrlParser: true
});

mongoose.connection.on('connected', function () {
    console.log("Mongoose default connection is open");
});

mongoose.connection.on('error', function (err) {
    console.log("Mongoose default connection has occured error", err);
});

mongoose.connection.on('disconnected', function () {
    console.log("Mongoose default connection is disconnected");
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log("Mongoose default connection is disconnected due to application termination");
        process.exit(0)
    });
});

module.exports = {
    mongoose
};