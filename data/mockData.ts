
import { Book, User, BookStatus, UserRole } from '../types';

export const mockBooks: Book[] = [
  {
    id: '1',
    isbn: '978-0132350884',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    coverUrl: 'https://picsum.photos/seed/cleancode/300/450',
    status: BookStatus.Available,
    description: 'A Handbook of Agile Software Craftsmanship. Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn’t have to be that way.'
  },
  {
    id: '2',
    isbn: '978-0201633610',
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
    coverUrl: 'https://picsum.photos/seed/designpatterns/300/450',
    status: BookStatus.Available,
    description: 'Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems. Previously undocumented, these 23 patterns allow designers to create more flexible, elegant, and ultimately reusable designs without having to rediscover the design solutions themselves.'
  },
  {
    id: '3',
    isbn: '978-0201485677',
    title: 'Refactoring: Improving the Design of Existing Code',
    author: 'Martin Fowler',
    coverUrl: 'https://picsum.photos/seed/refactoring/300/450',
    status: BookStatus.Borrowed,
    description: 'Refactoring is a controlled technique for improving the design of an existing code base. Its essence is applying a series of small behavior-preserving transformations, each of which "too small to be worth doing". However, the cumulative effect of these transformations is quite significant. By applying them continuously, you are able to improve the design of your code from a mess to a well-structured one.'
  },
  {
    id: '4',
    isbn: '978-0134494166',
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    coverUrl: 'https://picsum.photos/seed/cleanarchitecture/300/450',
    status: BookStatus.Available,
    description: 'Building upon the success of best-sellers Clean Code and The Clean Coder, legendary software craftsman Robert C. “Uncle Bob” Martin shows how to bring greater professionalism and discipline to application architecture and design.'
  },
  {
    id: '5',
    isbn: '978-0735619678',
    title: 'Code Complete',
    author: 'Steve McConnell',
    coverUrl: 'https://picsum.photos/seed/codecomplete/300/450',
    status: BookStatus.Available,
    description: 'Widely considered one of the best practical guides to programming, Steve McConnell’s original CODE COMPLETE has been helping developers write better software for more than a decade. Now this classic book has been fully updated and revised with leading-edge practices—and hundreds of new code samples—illustrating the art and science of software construction.'
  },
  {
    id: '6',
    isbn: '978-0262033848',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
    coverUrl: 'https://picsum.photos/seed/algorithms/300/450',
    status: BookStatus.Available,
    description: 'The bible of algorithms, this book provides a comprehensive introduction to the modern study of computer algorithms. It is a book for all computer scientists, programmers, and anyone else who wants to understand algorithms.'
  },
    {
    id: '7',
    isbn: '978-0135957059',
    title: 'The Pragmatic Programmer',
    author: 'David Thomas, Andrew Hunt',
    coverUrl: 'https://picsum.photos/seed/pragmatic/300/450',
    status: BookStatus.Available,
    description: 'The Pragmatic Programmer is one of those rare tech books you’ll read, re-read, and read again over the years. Whether you’re new to the field or an experienced practitioner, you’ll come away with fresh insights each and every time.'
  },
  {
    id: '8',
    isbn: '978-0596007126',
    title: 'Head First Design Patterns',
    author: 'Eric Freeman, Elisabeth Robson, Bert Bates, Kathy Sierra',
    coverUrl: 'https://picsum.photos/seed/headfirstdp/300/450',
    status: BookStatus.Available,
    description: 'A brain-friendly guide to building extensible and maintainable object-oriented software. You know you don\'t want to reinvent the wheel, so you look to Design Patterns--the lessons learned by those who\'ve faced the same problems.'
  },
  {
    id: '9',
    isbn: '978-1491904244',
    title: 'You Don\'t Know JS: Scope & Closures',
    author: 'Kyle Simpson',
    coverUrl: 'https://picsum.photos/seed/ydkjs1/300/450',
    status: BookStatus.Borrowed,
    description: 'No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. This concise, in-depth guide takes you inside JavaScript’s scope and closures, two core concepts you need to know to become a more efficient and effective programmer.'
  },
  {
    id: '10',
    isbn: '978-1449331818',
    title: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    coverUrl: 'https://picsum.photos/seed/eloquentjs/300/450',
    status: BookStatus.Available,
    description: 'A modern introduction to programming. JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.'
  },
  {
    id: '11',
    isbn: '978-0321125217',
    title: 'The Mythical Man-Month',
    author: 'Frederick P. Brooks Jr.',
    coverUrl: 'https://picsum.photos/seed/mythical/300/450',
    status: BookStatus.Available,
    description: 'Few books on software project management have been as influential and timeless as The Mythical Man-Month. With a blend of software engineering facts and thought-provoking opinions, Fred Brooks offers insight for anyone managing complex projects.'
  },
  {
    id: '12',
    isbn: '978-1934356590',
    title: 'Working Effectively with Legacy Code',
    author: 'Michael C. Feathers',
    coverUrl: 'https://picsum.photos/seed/legacycode/300/450',
    status: BookStatus.Available,
    description: 'This book provides programmers with the ability to cost-effectively handlecommon legacy code problems without having to go through the hugely expensive task of rewriting all legacy code.'
  }
];

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Kashif (Student)',
    email: 'student@example.com',
    password: 'password',
    role: UserRole.Student,
    loans: [
      {
        bookId: '3',
        loanDate: '2025-10-25',
        dueDate: '2025-11-08'
      }
    ]
  },
  {
    id: 'u2',
    name: 'Admin User',
    email: 'admin',
    password: 'admin',
    role: UserRole.Admin,
    loans: []
  },
    {
    id: 'u3',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    password: 'password123',
    role: UserRole.Student,
    loans: [
      {
        bookId: '9',
        loanDate: '2025-10-28',
        dueDate: '2025-11-11'
      }
    ]
  }
];
