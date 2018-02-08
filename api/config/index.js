var config = {
	AppName: 'Easy Chat',
	JWTKEY:'Easy Chat V1.0',
	database: require('./database'),
	DIR: {
		root: process.env.PWD+"/api",
		to: {
			uploads: 'uploads',
			pp: 'uploads/pp/'
		}
	},
	authEmail: {
		user: 'kadekgilangputra@gmail.com',
		pass: 'pdkqetfmviopqgjq'
    }
};
module.exports = config;