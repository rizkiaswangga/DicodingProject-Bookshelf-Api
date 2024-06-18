const { addBookHandler, getAllBooksHandler, getBookByIdHandler } = require('./handler')

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
    },

    // API menampilkan buku khusus ID tertentu :
    {
        method: 'GET',
        path: `/books/{bookId}`,
        handler: getBookByIdHandler,
    }
]

module.exports = routes;