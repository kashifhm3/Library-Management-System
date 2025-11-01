
import React, { useState } from 'react';
import { UserRole } from '../types';
import { useAuth } from '../context/AuthContext';

interface LoginPageProps {
  onGoToRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onGoToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.Student);
  const { login, isLoading, error } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email, password, role);
    }
  };
  
  const isStudent = role === UserRole.Student;
  const placeholderText = isStudent ? "Enter student email" : "Enter username";
  const inputType = isStudent ? "email" : "text";
  const autoCompleteType = isStudent ? "email" : "username";

  return (
    <div className="flex items-center justify-center min-h-screen -m-8 bg-[#1e293b]">
      <div className="w-full max-w-sm p-8 space-y-6 bg-[#293548] rounded-2xl shadow-2xl">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <svg className="h-10 w-10 text-[#818cf8]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h1 className="text-3xl font-bold text-white">Library System Login</h1>
          </div>
          <p className="mt-2 text-sm text-gray-400">Sign in to access the catalog</p>
        </div>

        <div className="flex justify-center">
            <div className="flex rounded-lg bg-[#1e293b] p-1 space-x-1">
                <button
                    onClick={() => setRole(UserRole.Student)}
                    className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors duration-300 ${role === UserRole.Student ? 'bg-[#818cf8] text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                    Student
                </button>
                <button
                    onClick={() => setRole(UserRole.Admin)}
                    className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors duration-300 ${role === UserRole.Admin ? 'bg-[#818cf8] text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                    Admin
                </button>
            </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input id="email-address" name="email" type={inputType} autoComplete={autoCompleteType} required value={email} onChange={e => setEmail(e.target.value)}
              className="relative block w-full px-3 py-2.5 bg-[#1e293b] border border-gray-600 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder={placeholderText}
              disabled={isLoading} />
          </div>
          <div>
            <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)}
              className="relative block w-full px-3 py-2.5 bg-[#1e293b] border border-gray-600 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
              disabled={isLoading} />
          </div>
          <div>
            <button type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#6366f1] hover:bg-[#4f46e5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        {error && (
            <p className="mt-2 text-center text-sm text-red-400">{error}</p>
        )}
        <div className="text-sm text-center flex justify-between items-center">
            <button onClick={onGoToRegister} className="font-medium text-indigo-400 hover:text-indigo-300">
                Sign up
            </button>
            <a href="#" className="font-medium text-gray-400 hover:text-gray-200 text-xs">
                Forgot password?
            </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
