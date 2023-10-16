const path = require('path');

module.exports = {
    entry: './src/content.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
