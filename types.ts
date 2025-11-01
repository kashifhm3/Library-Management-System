
export enum BookStatus {
  Available = 'Available',
  Borrowed = 'Borrowed',
}

export enum UserRole {
  Student = 'Student',
  Admin = 'Admin',
}

export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  coverUrl: string;
  status: BookStatus;
  description: string;
}

export interface Loan {
  bookId: string;
  loanDate: string;
  dueDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  loans: Loan[];
}
