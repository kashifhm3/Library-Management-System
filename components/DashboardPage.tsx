
import React, { useState } from 'react';
import { Book, User, UserRole } from '../types';
import BookCard from './BookCard';

interface DashboardPageProps {
  user: User;
  books: Book[];
  onSelectBook: (book: Book) => void;
  onSearch: (query: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, books, onSelectBook, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const loanedBookIds = user.loans.map(loan => loan.bookId);
  const userLoanedBooks = books.filter(book => loanedBookIds.includes(book.id));
  const availableBooks = books.filter(book => !loanedBookIds.includes(book.id));

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        <div className="w-full sm:w-auto flex gap-4">
          <form onSubmit={handleSearchSubmit} className="flex-grow sm:flex-grow-0 sm:w-64 md:w-80">
            <div className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for books..."
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button type="submit" className="absolute inset-y-0 right-0 px-4 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {userLoanedBooks.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Your Loans</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {userLoanedBooks.map(book => (
              <BookCard key={book.id} book={book} onSelectBook={onSelectBook} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Available Books</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {availableBooks.slice(0, 10).map(book => (
            <BookCard key={book.id} book={book} onSelectBook={onSelectBook} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
