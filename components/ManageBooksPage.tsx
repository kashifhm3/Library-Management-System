
import React, { useState } from 'react';
import { Book, BookStatus } from '../types';
import BookFormModal from './BookFormModal';

interface ManageBooksPageProps {
  books: Book[];
  onAddBook: (book: Omit<Book, 'id' | 'status'>) => void;
  onUpdateBook: (book: Book) => void;
  onDeleteBook: (bookId: string) => void;
  onBack: () => void;
}

const ManageBooksPage: React.FC<ManageBooksPageProps> = ({ books, onAddBook, onUpdateBook, onDeleteBook, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

  const handleOpenAddModal = () => {
    setBookToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (book: Book) => {
    setBookToEdit(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBookToEdit(null);
  };

  const handleSaveBook = (bookData: Omit<Book, 'id' | 'status'> | Book) => {
    if ('id' in bookData) {
      onUpdateBook(bookData);
    } else {
      onAddBook(bookData);
    }
    handleCloseModal();
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
            <button onClick={onBack} className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 mb-2">
                &larr; Back to Admin Dashboard
            </button>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Books</h2>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add New Book
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Author</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ISBN</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {books.map((book) => (
              <tr key={book.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{book.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{book.author}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{book.isbn}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    book.status === BookStatus.Available
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200'
                  }`}>
                    {book.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                  <button onClick={() => handleOpenEditModal(book)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">Edit</button>
                  <button onClick={() => onDeleteBook(book.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BookFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveBook}
        bookToEdit={bookToEdit}
      />
    </div>
  );
};

export default ManageBooksPage;
