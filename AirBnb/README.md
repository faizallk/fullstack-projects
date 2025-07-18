
# 🏡 Airbnb Clone – Full Stack Web App

This is a full-featured **Airbnb-like rental application** built using **Node.js, Express, MongoDB**, and **EJS templating** on the backend. It includes user authentication via **Passport.js**, full **CRUD functionality**, and image uploads using **Cloudinary**. The frontend is crafted with **HTML, CSS, Bootstrap, and EJS views**.

---

## 🚀 Features

- 🔐 User Authentication with Passport.js
- 🏘️ CRUD operations for Listings and Bookings
- 🖼️ Image Uploads using Cloudinary
- 🎨 Responsive UI with Bootstrap and EJS
- 🌐 RESTful routes and modular architecture
- ⚙️ Secure sessions and route protection

---

## 📁 Project Structure

```
airbnb-clone/
├── views/         # EJS templates (frontend)
├── public/        # Static files (CSS, JS, Images)
├── routes/        # Route controllers (Express)
├── models/        # Mongoose models (User, Listing, etc.)
├── config/        # DB & Passport configuration
├── app.js         # Entry point
└── package.json   # Project dependencies
```

---

## 🛠️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/faizallk/fullstack-projects.git
cd fullstack-projects/airbnb-clone
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory and add:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SESSION_SECRET=your_session_secret
```

4. **Run the development server**

```bash
npm start
```
**or**
```bash
npm run dev
```

Open your browser at: `http://localhost:3000`



## 🤝 Contributing

Feel free to fork this repo and contribute via pull requests. Any suggestions, improvements, or bug fixes are welcome!

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Faizal Khan**  
GitHub: [@faizallk](https://github.com/faizallk)  
LinkedIn: [faijalkhann](https://www.linkedin.com/in/faijalkhann/)
