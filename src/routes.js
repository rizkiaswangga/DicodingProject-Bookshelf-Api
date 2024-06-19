// Import handler:
const { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler } = require('./handler');


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
    },

    // API Mengubah data buku :
    {
        method: 'PUT',
        path: `/books/{bookId}`,
        handler: editBookByIdHandler,
    },

    // API menghapus buku :
    {
        method: 'DELETE',
        path: `/books/{bookId}`,
        handler: deleteBookByIdHandler,
    },
]

// Export routes :
module.exports = routes;