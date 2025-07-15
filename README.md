# 📚 Book Explorer

A modern web app built with **Next.js**, **TypeScript**, **React Query**, and **Firebase Auth** that allows users to **search books**, view detailed book info, and **save favorites**.

---

## 🚀 Features

- 🔍 Search books using [Google Books API](https://developers.google.com/books)
- 📖 View detailed book info (authors, description, image, etc.)
- ❤️ Add books to your **favorites**
- 🔐 Login & Signup with **Firebase Authentication**
- ⚡ Fast and optimized using **React Query**
- 🎨 Beautiful UI using **Material UI (MUI)**

---

## 🧪 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript
- **UI**: Material UI
- **Data Fetching**: React Query
- **Authentication**: Firebase Auth
- **Database**: Firestore (for storing favorites)

---

## 📁 Project Structure

<pre><code>
  
book-explorer/
├── components/                 # Reusable UI components
|    ├── Navbar.tsx             
|    ├── BookCard.tsx           
|    └── SearchBar.tsx
├── hooks/                      # Custom hooks (e.g., useBooks)
|   ├── utils/                  # Auth helpers
|   |   ├── useAuthCookies.ts   # store cookies using nookies
|   |   └── useAuth.ts          # handle login, signup, logout
|   └── react-query/useBook.ts  # fetch books list & book api call
├── lib/                     
|   └── firebase.ts             # Firebase setup
├── pages/                      # Next.js routes
│   ├── index.tsx               # Home/Search
│   ├── login.tsx               # Login page
│   ├── signup.tsx              # Signup page
│   ├── favorites.tsx           # Favorite books page
│   └── books/[id].tsx          # Book details
├── typesript/                  # TypeScript interfaces
|   └── type/book.ts 
├── mui-theme/                  # Custom MUI theme setup
│ ├── _muiPalette.ts            # Theme color logic
│ ├── _muiTheme.ts              # Complete theme config
│ └── MuiThemeProvider.tsx      # Theme provider component
├── middleware.ts               # for handle protected routing
├── public/                     # Public assets (images, icons)
├── styles/                     # Global styles (optional)
├── .env.local                  # Environment variables
├── tsconfig.json               # TypeScript config
├── next.config.js              # Next.js config
└── README.md                   # Project documentation

</code></pre>

---

## 🖼️ Screenshots

| Search | Book Details | Favorites |
|--------|---------------|-----------|
| ![](public/search.png) | ![](public/book-details.png) | ![](public/favorites.png) |

---

## 🔧 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/TanmayShil/Book-Explorer-Next-Firebase-GoogleBooksAPI-ReactQuery.git
cd book-explorer
```
---

## Configure Firebase
Create a Firebase project and enable:
 - Authentication (Email/Password)
 - Firestore database

Then, create a .env.local file in the root directory:

```bash
env

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

```
---

