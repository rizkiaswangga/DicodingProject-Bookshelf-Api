const { addBookHandler, getAllBooksHandler } = require('./handler')

const routes = [
    // API menyimpan buku :
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },

    // API menampilkan seluruh buku :
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    }
]

module.exports = routes;