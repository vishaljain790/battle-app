import mongoose from 'mongoose';

mongoose.Promise = global.Promise;


//process env variable is used to get mongodbConnectionUrl on heroku...
//one can set same on local env to test it locally
mongoose.connect(process.env.mongo_db_connection_url,{ useNewUrlParser: true });

mongoose.connection.on('connected', function () {
    console.log("Mongoose default connection is open");
});

mongoose.connection.on('error', function (err) {
    console.log("Mongoose default connection has occured error",err);
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