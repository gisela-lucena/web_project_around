# 🌎 Around the U.S. (EUA Afora)

**Around the U.S.** is an interactive photo gallery web application where users can explore beautiful places across the United States, edit their profile information, and create personalized photo cards.  

This project showcases a clean and modular architecture built with **HTML, CSS (BEM), and JavaScript (OOP)** — focusing on scalability, reusability, and responsive design.

---


## 📸 Features

- Display of **6 initial photo cards** featuring U.S. landmarks  
- **Add new cards** through a popup form  
- **Like/Unlike** functionality for cards  
- **Delete cards** dynamically  
- **Edit user profile** (name and occupation)  
- **View enlarged images** in a popup  
- **Real-time form validation**  
- **Fully responsive interface** for both desktop and mobile  
- Popups close with:
  - `ESC` key  
  - Click outside the popup  
- Form submission with `Enter` key  

---

## 🛠️ Technologies Used

- **HTML5** – Semantic and accessible structure  
- **CSS3** – Responsive design with **BEM methodology**  
- **JavaScript (ES6+)** – Modular and **Object-Oriented Programming (OOP)**  
- **Git & GitHub** – Version control and collaboration  

---

## 🧩 Project Architecture

This project follows an **object-oriented architecture** with separate classes for each main functionality:

| File | Description |
|------|--------------|
| `Card.js` | Handles card creation, rendering, and interactivity (like/delete/view). |
| `FormValidator.js` | Validates input fields and provides instant feedback. |
| `Section.js` | Renders lists of elements dynamically in the DOM. |
| `Popup.js` | Base class for managing popup open/close behavior. |
| `PopupWithForm.js` | Extends `Popup` for handling form submissions. |
| `PopupWithImage.js` | Extends `Popup` to display enlarged images. |
| `UserInfo.js` | Manages user profile data and updates UI accordingly. |

All classes are written using **ES6 modules**, ensuring a clean, reusable, and scalable structure.

---

## 📁 File Structure

```

src/
├── index.html
├── pages/
│   ├── index.css
│   └── index.js
├── blocks/           # CSS files structured by BEM methodology
├── images/           # Project images
└── components/       # JavaScript classes

````

---

## 💻 Installation & Setup

Follow these steps to run the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/gisela-lucena/web_project_around.git

2. **Navigate to the project directory**

   ```bash
   cd around-the-us/src
   ```

3. **Open the project**

   * Simply open `index.html` in your preferred browser
     *(No build step or dependencies required — pure HTML/CSS/JS project)*

---

## 🧠 Usage Guide

Once the app is open in your browser:

1. Click **“Edit Profile”** to update your name and occupation.
2. Click **“Add Place”** to create a new photo card with a title and image URL.
3. Hover over a card to **like** or **delete** it.
4. Click on an image to view it in a **fullscreen popup**.
5. Use the `ESC` key or click outside to close any popup.

---

## 🧱 Technical Overview

The code is built around **OOP principles** for better maintainability and scalability:

* **Encapsulation:** Each class handles its own logic independently.
* **Inheritance:** Popup-related classes extend a common base (`Popup`) to reuse behavior.
* **Modularity:** Each class is in a separate file, imported via ES6 modules.
* **Dynamic Rendering:** The `Section` class handles all DOM rendering for card collections.
* **Validation Logic:** `FormValidator` provides reusable validation across all forms.

---

## 🚧 Future Improvements

Planned enhancements for future versions:

* ✅ Persistent data using **localStorage** or **API integration**
* ✅ User authentication (login/register flow)
* ✅ Image upload instead of URLs
* ✅ Animations and transition effects for better UX
* ✅ Accessibility (ARIA attributes and keyboard navigation)

---

## 👩‍💻 Author

**Gisela Lucena**
Front-End Developer | JavaScript & Web Applications
📧 www.linkedin.com/in/giselaelia
🌐 https://github.com/gisela-lucena

---

## 📝 License

This project is licensed under the **MIT License**.
Feel free to use, modify, and distribute it as long as proper credit is given.

---

> “Around the U.S.” is part of a learning project focused on front-end architecture, user experience, and clean, maintainable JavaScript code.

---

