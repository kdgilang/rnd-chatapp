const database = {
	dbname: 'newssubscriber',
	dbuser: 'gilangtravlr',
	dbpassword: 'nkMPCo0l7NGKHEoI',
	getDatabaseUrl: function() {
		return `mongodb+srv://${this.dbuser}:${this.dbpassword}@${this.dbname}.kz6skzv.mongodb.net/?retryWrites=true&w=majority`;
	}
};
module.exports = database;