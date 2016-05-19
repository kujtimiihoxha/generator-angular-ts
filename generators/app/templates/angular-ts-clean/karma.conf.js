var fs = require('fs');
module.exports = function(config) {
    var  cnf = null;
    if (fs.existsSync('ng-ts.json')) {
        cnf = JSON.parse(fs.readFileSync('ng-ts.json', 'utf-8'));
    } else {
        proceskarmas.exit(1);
    };
    config.set({

        basePath: "",
        frameworks: ["jasmine"],
        files: [
            cnf.dist.paths.base+cnf.dist.paths.js+'/'+cnf.dist.vendorJs,
            "node_modules/angular-mocks/angular-mocks.js",
            "node_modules/ng-describe/dist/ng-describe.js",
            cnf.dist.paths.base+cnf.dist.paths.js+'/'+cnf.dist.templates,
            cnf.dist.paths.base+cnf.dist.paths.js+'/'+cnf.dist.js,
            cnf.tests.patters.tests
        ],
        browsers: ["PhantomJS"],

        exclude: [],

        preprocessors: cnf.tests.preprocessors,

        typescriptPreprocessor: {
            // options passed to the typescript compiler
            options: {
                noImplicitAny: true,
                suppressImplicitAnyIndexErrors: true,
                experimentalDecorators: true
            },
            // extra typing definitions to pass to the compiler (globs allowed)
            typings: [
                cnf.src.paths.typings,
                cnf.src.appTypings,
                cnf.src.main,
            ],
            // transforming the filenames
            transformPath: function(path) {
                return path.replace(/\.ts$/, ".js");
            }
        },

        plugins : [
            "karma-jasmine",
            "karma-phantomjs-launcher",
            "karma-typescript-preprocessor"
        ]

        // define reporters, port, logLevel, browsers etc.
    });
};

