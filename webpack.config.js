var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: {
        pages: "Pages/index",
        base: [
            "jquery",
            "underscore",
            "backbone",
            "backbone.stickit",
            "backbone.marionette"
        ]/*,
        testBundle: ['phantomjs-polyfill', 'tests']*/
    },
    output: {
        path: path.resolve(__dirname, "src/Resources/public/js/"),
        chunkFilename: "[id].[chunkhash].js",
        publicPath: 'src/Resources/public/js/',
        filename: "[name].js"
    },
    stats: {
        // Configure the console output
        colors: false,
        modules: true,
        reasons: true
    },

    module: {
        loaders: [
                        { test: /\.twig/, loader: "twig" },
//                        { test: /\.css$/, loader: "style!css" },
//                        { test: /\.less$/, loader: "style!css!less" }
        ]
    },
    node: {
        fs: "empty"
    },
    resolve: {
        root: [
            path.resolve(__dirname, "bower_components"),
            path.resolve(__dirname, "src/Resources/js"),
            path.resolve(__dirname, "."),
            path.resolve(__dirname, "src/Resources/twigjs")
        ],
        alias: {
        }
    },
    externals: {
        "Routing": "Routing"
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),
        new webpack.optimize.CommonsChunkPlugin("base", "base.js"),
        new webpack.ProvidePlugin({
            "Backbone": "backbone"
//            "window.jQuery": "jquery",
//            jQuery: "jquery",
//            $: "jquery",
//            app: "app",
//            _: "underscore"
        })
    ]
};
