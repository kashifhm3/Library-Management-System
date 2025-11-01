
import React from 'react';
import { Book, BookStatus } from '../types';

interface BookCardProps {
  book: Book;
  onSelectBook: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onSelectBook }) => {
  const isAvailable = book.status === BookStatus.Available;

  return (
    <div 
      onClick={() => onSelectBook(book)} 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer flex flex-col"
    >
      <div className="relative">
        <img src={book.coverUrl} alt={`Cover of ${book.title}`} className="w-full h-48 object-cover" />
        <span className={`absolute top-2 right-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          isAvailable 
          ? 'bg-green-100 dark:bg-green-900/80 text-green-800 dark:text-green-100' 
          : 'bg-yellow-100 dark:bg-yellow-900/80 text-yellow-800 dark:text-yellow-100'
        }`}>
          {book.status}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h4 className="text-md font-bold text-gray-900 dark:text-white truncate" title={book.title}>
          {book.title}
        </h4>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 truncate" title={book.author}>
          {book.author}
        </p>
        <div className="mt-auto pt-2">
            <button 
                className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline"
            >
                View Details &rarr;
            </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
