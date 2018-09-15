module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		eslint: {
			all: [
				"Gruntfile.js",
				"jsx/*.jsx",
			]
		},

		babel: {
			options: {
				presets: [
					'@babel/preset-env',
				]
			},
			dist: {
				files: [{
					"expand": true,
					"cwd": "jsx",
					"src": ["**/*.jsx"],
					"dest": "js/",
					"ext": ".js",
				}]
			}
		},

		uglify: {
			build: {
				options: {
					output: {
						ascii_only: true,
					}
				},
				files: [{
					expand: true,
					cwd: "js",
					dest: "js",
					src: [
						"*.js",
						"!*.min.js"
					],
					ext: '.min.js'
				}]
			}
		},

	});

	grunt.loadNpmTasks("grunt-babel");
	grunt.loadNpmTasks("grunt-contrib-uglify-es");
	grunt.loadNpmTasks("grunt-eslint");

	grunt.registerTask("jsx", ["babel","uglify"]);
};
