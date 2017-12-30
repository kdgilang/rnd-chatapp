var database = {
	dbname: '',
	dburl: 'mongodb://127.0.0.1:27017/',
	user: false,
	password: false,
	getDatabaseUrl: function(dbname) {
		let fixdbname = this.dbname || dbname;
		return this.dburl+fixdbname;
	}
};
module.exports = database;