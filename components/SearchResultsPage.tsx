
import React from 'react';
import { Book } from '../types';
import BookCard from './BookCard';

interface SearchResultsPageProps {
  results: Book[];
  onSelectBook: (book: Book) => void;
  onBack: () => void;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ results, onSelectBook, onBack }) => {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Search Results</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 border border-transparent rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          &larr; Back to Dashboard
        </button>
      </div>
      
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {results.map(book => (
            <BookCard key={book.id} book={book} onSelectBook={onSelectBook} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">No Books Found</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Sorry, we couldn't find any books matching your search. Try different keywords.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
