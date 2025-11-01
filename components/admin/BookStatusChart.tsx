
import React from 'react';

interface BookStatusChartProps {
  onLoan: number;
  available: number;
  total: number;
}

const BookStatusChart: React.FC<BookStatusChartProps> = ({ onLoan, available, total }) => {
    const onLoanPercentage = total > 0 ? (onLoan / total) * 100 : 0;
    const availablePercentage = total > 0 ? (available / total) * 100 : 0;
    const circumference = 2 * Math.PI * 45; // 2 * pi * radius
    
    const availableStroke = (availablePercentage / 100) * circumference;
    const onLoanStroke = (onLoanPercentage / 100) * circumference;


  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Book Status Overview</h3>
      <div className="flex items-center justify-center space-x-8">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle cx="50" cy="50" r="45" fill="transparent" strokeWidth="10" className="stroke-gray-200 dark:stroke-gray-700" />
            
            {/* Available segment */}
            <circle cx="50" cy="50" r="45" fill="transparent" strokeWidth="10" 
                className="stroke-green-500"
                strokeDasharray={`${availableStroke} ${circumference}`}
                transform="rotate(-90 50 50)"
            />
            {/* On Loan segment */}
             <circle cx="50" cy="50" r="45" fill="transparent" strokeWidth="10" 
                className="stroke-yellow-500"
                strokeDasharray={`${onLoanStroke} ${circumference}`}
                transform={`rotate(${(availablePercentage * 3.6) - 90} 50 50)`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{total}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Books</span>
          </div>
        </div>
        <div className="space-y-2">
            <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Available</p>
                    <p className="font-bold text-gray-900 dark:text-white">{available}</p>
                </div>
            </div>
            <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">On Loan</p>
                    <p className="font-bold text-gray-900 dark:text-white">{onLoan}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BookStatusChart;
