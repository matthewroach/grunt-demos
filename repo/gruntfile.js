module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			all: ['grunt.js', 'src/js/*.js'],
			options: {
				browser: true,
				laxcomma: true
			}
		},

		concat : {
			js : {
				src : ['src/js/**/*.js'],
				dest : 'dist/<%= pkg.name %>.js'
			},
			css : {
				src : ['src/css/**/*.css'],
				dest : 'dist/<%= pkg.name %>.css'
			}
		},

		cssmin: {
		  compress: {
		    files: {
		      "dist/<%= pkg.name %>.min.css": ["src/css/**.css"]
		    }
		  }
		},

		uglify: {
    	options: {
      	banner:
      	'/* ---\n' +
      	'   <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '   <%= pkg.author.url %> - <%= pkg.author.email %>\n' +
        '   Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
        '--- */\n'
    },
   		build: {
      	src: 'dist/<%= pkg.name %>.js',
      	dest: 'dist/<%= pkg.name %>.min.js'
      }
    },

		watch: {
		  scripts: {
		    files: 'src/**/*',
		    tasks: ['concat'],
		    options: {
		      interrupt: true
		    }
		  }
		},

		yuidoc: {
		  compile: {
		    name: '<%= pkg.name %>',
		    description: '<%= pkg.description %>',
		    version: '<%= pkg.version %>',
		    url: '<%= pkg.homepage %>',
		    options: {
		      paths: 'src/js/',
		      outdir: 'docs/'
		    }
		  }
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint', 'concat', 'cssmin', 'uglify', 'yuidoc']);
	grunt.registerTask('check', ['jshint']);
	grunt.registerTask('watchme', ['watch']);

};
