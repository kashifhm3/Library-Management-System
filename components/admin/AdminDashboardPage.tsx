
import React from 'react';
import { mockBooks, mockUsers } from '../../data/mockData';
import { BookStatus, UserRole } from '../../types';
import { Page } from '../../App';
import StatCard from './StatCard';
import BookStatusChart from './BookStatusChart';
import OverdueBooksWidget, { OverdueLoan } from './OverdueBooksWidget';

interface AdminDashboardPageProps {
    onNavigate: (page: Page) => void;
}

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
    // --- Data Calculations ---
    const totalBooks = mockBooks.length;
    const booksOnLoan = mockBooks.filter(b => b.status === BookStatus.Borrowed).length;
    const availableBooks = totalBooks - booksOnLoan;
    const totalMembers = mockUsers.filter(u => u.role === UserRole.Student).length;

    const today = new Date();
    const overdueLoans: OverdueLoan[] = [];
    mockUsers.forEach(user => {
        user.loans.forEach(loan => {
            const dueDate = new Date(loan.dueDate);
            if (dueDate < today) {
                const book = mockBooks.find(b => b.id === loan.bookId);
                if (book) {
                    const diffTime = today.getTime() - dueDate.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    overdueLoans.push({ user, book, loan, daysOverdue: diffDays });
                }
            }
        })
    });
    const totalOverdue = overdueLoans.length;

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Admin Dashboard</h2>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Books" value={totalBooks} color="bg-blue-100 dark:bg-blue-900/50" icon={<svg className="h-6 w-6 text-blue-600 dark:text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>} />
                <StatCard title="Books on Loan" value={booksOnLoan} color="bg-yellow-100 dark:bg-yellow-900/50" icon={<svg className="h-6 w-6 text-yellow-600 dark:text-yellow-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                <StatCard title="Total Members" value={totalMembers} color="bg-green-100 dark:bg-green-900/50" icon={<svg className="h-6 w-6 text-green-600 dark:text-green-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
                <StatCard title="Overdue Books" value={totalOverdue} color="bg-red-100 dark:bg-red-900/50" icon={<svg className="h-6 w-6 text-red-600 dark:text-red-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-4">
                    <button className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Issue Book</button>
                    <button className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Process Return</button>
                    <button onClick={() => onNavigate('manageBooks')} className="px-5 py-2.5 text-sm font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-900">Manage Books</button>
                    <button onClick={() => onNavigate('manageUsers')} className="px-5 py-2.5 text-sm font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-900">Manage Users</button>
                </div>
            </div>

            {/* Data Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <OverdueBooksWidget overdueLoans={overdueLoans} />
                </div>
                <div>
                    <BookStatusChart onLoan={booksOnLoan} available={availableBooks} total={totalBooks} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
