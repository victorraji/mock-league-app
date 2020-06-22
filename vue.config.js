const path = require('path');
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://mock-liga.herokuapp.com/'
            }
        }
    }
}