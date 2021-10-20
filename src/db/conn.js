var mongoose = require("mongoose");

var conn_str = "mongodb://127.0.0.1:27017/tcet";

mongoose.connect(conn_str, {
	useNewUrlParser: true, useUnifiedTopology:true
}).then(() => {
    console.log(`Connection successful`);
}).catch((e) => {
    console.log(`No connection`);
})

