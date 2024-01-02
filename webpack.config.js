const path = require('path')

module.exports = {
    entry: {
        common: './assets/js/common.js',
        index: './assets/js/index.js',
        stats: './assets/js/stats.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }]
    },
    mode: 'development',
}