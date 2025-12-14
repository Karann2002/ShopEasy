
# 🛒 eCommerce Website (React + Firebase)

## 📸 Screenshots

| User Panel | Admin Panel |
|------------|-------------|
| ![User](./public/Screenshot%202025-07-14%20163057.png) | ![Admin](./public/Screenshot%202025-07-14%20175856.png) |

---

An eCommerce web application built with **React + Vite**, featuring:

- 🔐 Firebase Authentication (Email/Password, Google)
- 🧑‍💼 Admin Panel for product & order management
- 🛍️ User Panel for browsing, cart, wishlist, checkout
- ☁️ Firestore Database
- 📁 Firebase Storage for image uploads

---

## 🚀 Features

### 👤 User Panel
- Sign Up / Sign In
- Browse products
- Add to Cart / Wishlist (stored in Firestore)
- Checkout simulation
- Order history
- Profile management

### 🛠️ Admin Panel
- Role-based access
- Add, edit, delete products
- Upload product images to Firebase Storage
- View and manage orders

---

## 🧱 Tech Stack

- **Frontend**: React + Vite
- **Auth**: Firebase Authentication
- **Database**: Cloud Firestore
- **Storage**: Firebase Storage
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Notifications**: React Toastify

---

## 📁 Project Structure

```
src/
  ├── admin/           # Admin components/pages
  ├── user/            # User-facing components/pages
  ├── components/      # Reusable components
  ├── context/         # Global auth and state context
  ├── firebase-config.js
  └── App.jsx, main.jsx
```

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-app.git
cd ecommerce-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Firebase

Create `src/firebase-config.js`:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

---

## 🔒 Role-Based Access

Users are assigned roles (admin/user) via Firestore in a `users` collection. Admin routes are protected using role checks in React Router.

---

## 🧪 Development

```bash
npm run dev
```

---

## 📦 Production Build

```bash
npm run build
npm run preview
```

---



## 📝 License

Licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- Firebase
- React
- Tailwind CSS
- Vite
