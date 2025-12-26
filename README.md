# 📚 MyBookPlanet

A personalized book recommendation and community platform designed to help users discover their "Reading Universe." Interact with fellow readers through **BookLumi**, our unique social reading feature.

---

## 🎯 Motivation & Goals

- **Personalized Recommendations**: Unlike movies or music, book recommendations often lack deep personalization. MyBookPlanet provides **meaningful suggestions** based on individual genres, moods, and reading purposes.
- **Tackling Literacy Decline**: We encourage **consistent reading habits** through personalized alerts and attendance tracking to address the growing issue of declining literacy.
- **Community-Driven Ecosystem**: Beyond just recommendations, we foster a **social reading environment** where users share reviews, ratings, and follow like-minded readers.
- **Data-Driven Optimization**: We aim to continuously refine our recommendation engine using accumulated behavioral data for potential B2B collaborations with publishers and bookstores.

---

## ⚙️ Key Features

### 1) User Management
- Email-based account creation and authentication.
- Customizable profiles including nicknames, bios, and profile pictures.

### 2) Personalized Recommendation Engine
- **Scenario-based Preference Test**: Analyzes user preferences across various genres (Fantasy, SF, Thriller, etc.), moods, and reading goals.
- **Dynamic Recommendations**: Provides a curated list of books based on test results, ratings, and real-time trends (e.g., weather-integrated rules).
- **Scraping/Saving**: Users can save recommended books directly to their personal library.

### 3) Social & Community
- Review system: Create, edit, and delete reviews with **star ratings**.
- Social interaction: Engagement features like likes, comments, and a follow-based feed.

### 4) Library Integration & Search
- Real-time **Bestseller lists** integrated via Aladin/Interpark APIs.
- Comprehensive book **search** functionality with detailed information pages.

### 5) Habit Formation Tools
- **10-minute Daily Reading** push notifications to build consistency.
- **Attendance System**: "Streaks" and achievement badges to motivate long-term reading habits.

---

## 🧰 Tech Stack

- **Frontend**: React (Vite), React Router, Zustand/Redux (State Management), Tailwind CSS.
- **Backend**: Node.js, Express, MySQL.
- **APIs**: Aladin API, Interpark API (Search/Bestsellers).
- **Design**: Figma.

---

## 🚀 Getting Started (Local Development)

```bash
# 0) Clone the repository
git clone <your-repo-url>
cd MyBookPlanet

# 1) Install dependencies
npm i

# 2) Environment Variables
cp .env.example .env
# Enter your API endpoints and keys in the .env file

# 3) Run development server
npm run dev
