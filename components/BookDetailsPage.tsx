
import React from 'react';
import { Book, BookStatus } from '../types';

interface BookDetailsPageProps {
  book: Book;
  onBorrow: (bookId: string) => void;
  onBack: () => void;
}

const BookDetailsPage: React.FC<BookDetailsPageProps> = ({ book, onBorrow, onBack }) => {
  const isAvailable = book.status === BookStatus.Available;

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 border border-transparent rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          &larr; Back
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex md:space-x-8">
          <div className="md:w-1/3 flex-shrink-0">
            <img src={book.coverUrl} alt={`Cover of ${book.title}`} className="rounded-lg shadow-md w-full object-cover" />
          </div>
          <div className="mt-6 md:mt-0 md:w-2/3">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white">{book.title}</h2>
            <p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">by {book.author}</p>
            <div className="mt-4 flex items-center space-x-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                isAvailable 
                ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200' 
                : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200'
              }`}>
                {book.status}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">ISBN: {book.isbn}</span>
            </div>
            <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">{book.description}</p>
            <div className="mt-8">
              <button
                onClick={() => onBorrow(book.id)}
                disabled={!isAvailable}
                className={`w-full sm:w-auto px-8 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isAvailable
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                }`}
              >
                {isAvailable ? 'Borrow This Book' : 'Currently on Loan'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
