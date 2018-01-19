var database = {
	dbname: 'easychat',
	user: 'root',
	password: '123123123',
	getDatabaseUrl: function() {
		return 'mongodb://'+this.user+':'+this.password+'@easychat-shard-00-00-6z6xo.mongodb.net:27017,easychat-shard-00-01-6z6xo.mongodb.net:27017,easychat-shard-00-02-6z6xo.mongodb.net:27017/'+this.dbname+'?ssl=true&replicaSet=easychat-shard-0&authSource=admin';
	}
};
module.exports = database;