
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Book, UserRole, BookStatus, User } from './types';
import { mockBooks } from './data/mockData';

// Page Components
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import ManageBooksPage from './components/ManageBooksPage';
import BookDetailsPage from './components/BookDetailsPage';
import SearchResultsPage from './components/SearchResultsPage';
import RegistrationPage from './components/RegistrationPage';
import AdminDashboardPage from './components/admin/AdminDashboardPage';
import UserManagementPage from './components/admin/UserManagementPage';


// Layout and Helper Components
import LoadingSpinner from './components/LoadingSpinner';
import Header from './components/Header';

export type Page = 'login' | 'register' | 'dashboard' | 'searchResults' | 'bookDetails' | 'manageBooks' | 'adminDashboard' | 'manageUsers';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};

const Main: React.FC = () => {
  const { user, isLoading: isAuthLoading, logout, register, error: authError, clearError } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  
  // Navigate based on user authentication state
  useEffect(() => {
    if (!isAuthLoading && user) {
        setCurrentPage(user.role === UserRole.Admin ? 'adminDashboard' : 'dashboard');
    } else if (!isAuthLoading) {
        setCurrentPage('login');
    }
  }, [user, isAuthLoading]);
  
  // Simulate initial data fetch
  useEffect(() => {
    setTimeout(() => {
        setIsDataLoading(false);
    }, 500);
  }, []);

  const navigate = (page: Page) => setCurrentPage(page);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    navigate('bookDetails');
  };

  const handleSearch = (query: string) => {
    const results = books.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
    navigate('searchResults');
  };

  const handleBorrowBook = (bookId: string) => {
    setBooks(currentBooks =>
      currentBooks.map(b =>
        b.id === bookId ? { ...b, status: BookStatus.Borrowed } : b
      )
    );
    // In a real app, this would also update the user's loans, possibly via context
    navigate('dashboard');
  };

  const handleAddBook = (bookData: Omit<Book, 'id' | 'status'>) => {
    const newBook: Book = {
        ...bookData,
        id: String(Date.now() + Math.random()), // Simple unique id
        status: BookStatus.Available,
    };
    setBooks(prevBooks => [...prevBooks, newBook]);
  };

  const handleUpdateBook = (updatedBook: Book) => {
    setBooks(prevBooks => prevBooks.map(b => b.id === updatedBook.id ? updatedBook : b));
  };

  const handleDeleteBook = (bookId: string) => {
    setBooks(prevBooks => prevBooks.filter(b => b.id !== bookId));
  };

  const handleRegistration = async (name: string, email: string, password: string) => {
    const success = await register(name, email, password);
    if (success) {
        alert('Registration successful! Please log in.');
        navigate('login');
    }
  };

  const renderContent = () => {
    if (isAuthLoading || isDataLoading) {
        return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
    }

    if (!user) {
      switch (currentPage) {
        case 'register':
            return <RegistrationPage onRegister={handleRegistration} onBackToLogin={() => { clearError(); navigate('login'); }} isLoading={isAuthLoading} error={authError} />;
        default:
            return <LoginPage onGoToRegister={() => { clearError(); navigate('register'); }} />;
      }
    }

    // --- Authenticated Routes ---
    const pageContent = () => {
        const studentDashboard = user.role === UserRole.Admin ? 'adminDashboard' : 'dashboard';
        switch (currentPage) {
            case 'dashboard':
                return <DashboardPage user={user} books={books} onSelectBook={handleSelectBook} onSearch={handleSearch} />;
            case 'adminDashboard':
                return user.role === UserRole.Admin ? <AdminDashboardPage onNavigate={navigate} /> : null;
            case 'manageBooks':
                return user.role === UserRole.Admin ? <ManageBooksPage books={books} onAddBook={handleAddBook} onUpdateBook={handleUpdateBook} onDeleteBook={handleDeleteBook} onBack={() => navigate('adminDashboard')} /> : null;
            case 'manageUsers':
                return user.role === UserRole.Admin ? <UserManagementPage onBack={() => navigate('adminDashboard')} /> : null;
            case 'bookDetails':
                return selectedBook ? <BookDetailsPage book={selectedBook} onBorrow={handleBorrowBook} onBack={() => navigate(studentDashboard)} /> : null;
            case 'searchResults':
                return <SearchResultsPage results={searchResults} onSelectBook={handleSelectBook} onBack={() => navigate(studentDashboard)} />;
            default:
                 navigate(studentDashboard);
                 return null;
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
          <Header user={user} onLogout={logout} />
          <main className="p-4 sm:p-6 lg:p-8">
            {pageContent()}
          </main>
        </div>
    );
  };
  
  return <div className="antialiased text-gray-900 dark:text-gray-100">{renderContent()}</div>;
};

export default App;
