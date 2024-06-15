const { addBookHandler } = require('./handler')

const routes = [
    // API menyimpan buku :
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
]

module.exports = routes;