module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		eslint: {
			all: [
				"Gruntfile.js",
				"js/*.js",
				"!js/*.min.js"
			]
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

	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-eslint");

};
