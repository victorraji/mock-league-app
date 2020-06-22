const path = require('path');
module.exports = {
    outputDir: path.resolve(__dirname, '../league/public'),
    devServer: {
        proxy: {
            '/api': {
                target: 'https://mock-liga.herokuapp.com/'
            }
        }
    }
}