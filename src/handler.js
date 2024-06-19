const books = require('./books');
const { failAddBook, idNotFound, wrongRequirements, success } = require ('./handlerResponse');
const { nanoid } = require('nanoid');

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toString();
    const updatedAt = insertedAt;

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    }

    if ( newBook.name == undefined ){
        return wrongRequirements(h, 'Gagal menambahkan buku. Mohon isi nama buku');
    }
    if ( newBook.readPage > newBook.pageCount ){
        return wrongRequirements(h, 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
    }

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        return success(h, 'Buku berhasil ditambahkan', 201, { bookId: id });
    }

    return failAddBook(h, 'Buku gagal ditambahkan');
};

const getAllBooksHandler = (request, h) => {
    const { reading, finished, name} = request.query;
    console.log(reading, finished, name);
    

    let filteredBooks = books;
    console.log(filteredBooks);

    const toBoolean = (value) => {
        return value === '1';
    }

    if (reading !== undefined){
        filteredBooks = filteredBooks.filter(book => book.reading === (toBoolean(reading)));
    }
    if (finished !== undefined){
        filteredBooks = filteredBooks.filter(book => book.finished === (toBoolean(finished)));
    }

    if (name !== undefined){
        const searchName = name.toLowerCase();
        filteredBooks = filteredBooks.filter(book => book.name.toLowerCase().includes(searchName));
    }

    const displayTotalSummarizedBooks = filteredBooks.map(book => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
    }));

    return success(h, undefined, undefined, { books: displayTotalSummarizedBooks });
};

const getBookByIdHandler = (request, h) => {
    const { bookId }  = request.params;

    const book = books.filter((n) => n.id === bookId)[0];

    if (book !== undefined){
        return success(h, undefined, undefined, { book });
    }

    return idNotFound(h, 'Buku tidak ditemukan');
}

const editBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const { name, author, year, summary, publisher, pageCount, readPage, reading } = request.payload

    if( name === undefined ){
        return wrongRequirements(h, 'Gagal memperbarui buku. Mohon isi nama buku');
    }
    if( readPage > pageCount ){
        return wrongRequirements(h, 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');
    }

    const index = books.findIndex((book) => book.id === bookId);
    const updatedAt = new Date().toString();

    if(index !== -1){
        books[index] = {
            ...books[index],
            name,
            author,
            year,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt
        };

        return success(h, 'Buku berhasil diperbarui', undefined, undefined);
    }

    return idNotFound(h, 'Gagal memperbarui buku. Id tidak ditemukan');
}

const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1){
        return success(h, 'Buku berhasil dihapus', undefined, undefined);
    }

    return idNotFound(h, 'Buku gagal dihapus. Id tidak ditemukan');
};
module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler};