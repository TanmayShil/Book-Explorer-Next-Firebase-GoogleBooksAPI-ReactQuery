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


