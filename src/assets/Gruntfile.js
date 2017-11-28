'use strict';
module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'../../static/css/app.min.css': ['scss/style.scss', 'scss/bootstrap/bootstrap.scss']
				}
			}
		},
	    uglify: {
		    my_target: {
		      files: {
	        		'../../static/js/app.min.js': ['js/*.js']
	        	}
	      	}
	    },
		watch: {
			scss: {
				files: ['scss/*.scss', 'scss/bootstrap/*.scss'],
				tasks: ['sass']
			},
			scripts: {
				files: ['js/*.js'],
				tasks: ['uglify']
			}
		}
	}); 

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['scss', 'scripts']);
};
