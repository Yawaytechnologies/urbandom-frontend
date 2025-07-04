# 🏠 Urbandom UI

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E=18.0.0-green.svg)](https://nodejs.org/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![Contributors](https://img.shields.io/github/contributors/urbandom/urbandom-ui)](https://github.com/urbandom/urbandom-ui/graphs/contributors)

Main user-facing frontend for Urbandom—a modern real estate platform to explore, search, and manage properties.

---

## 📷 Screenshots

![Homepage Screenshot](./screenshots/homepage.png)
*Add more screenshots of your UI as your project grows.*

---

## 🏠 About

This repository contains the codebase for the **Urbandom UI**, the primary interface for buyers, sellers, and renters to interact with the Urbandom platform.

---

## ✨ Features

- 🔍 Property search and filtering
- 🗺️ Interactive map integration
- 🏘️ Property detail and gallery pages
- 👤 User authentication (login/register)
- 📅 Schedule visits and inquiries
- 📱 Fully responsive & mobile-friendly

---

## ⚙️ Tech Stack

- [React.js](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)
- (Add other libraries as needed)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or later)
- [Yarn](https://yarnpkg.com/) or npm

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/urbandom/urbandom-ui.git
    cd urbandom-ui
    ```

2. **Install dependencies:**
    ```bash
    yarn install
    # or
    npm install
    ```

3. **Copy environment variables:**
    ```bash
    cp .env.example .env
    ```
    Update the `.env` file with your configuration.

4. **Run the development server:**
    ```bash
    yarn start
    # or
    npm run start
    ```

    The app should now be running at [http://localhost:3000](http://localhost:3000)

---

## 🔑 Environment Variables

Create a `.env` file in the root directory and configure the following:

```env
REACT_APP_API_URL=https://api.urbandom.com
REACT_APP_GOOGLE_MAPS_KEY=xxxxxxx
# Add more as required
