# CineScope - Movie Discovery App

CineScope is a modern, responsive web application for discovering movies and TV shows. Built with React and powered by [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api), it provides up‑to‑date information on trending, top‑rated, and upcoming titles, along with cast details and trailers.

## Features

- **Browse by Categories** –> Explore trending, top‑rated, and upcoming movies directly on the homepage.
- **Search** –> Instantly find any movie or TV show using the dynamic search bar.
- **Detailed View** –> Click on any title to see a comprehensive overview: synopsis, rating, release date, cast, and official trailer.
- **Modern UI** –> Clean and intuitive interface crafted with Tailwind CSS.

## ️ Tech Stack

- **Frontend:** React (Vite)  
- **Routing:** React Router DOM v7  
- **Styling:** Tailwind CSS  
- **HTTP Client:** Axios  
- **API:** [TMDB API](https://developers.themoviedb.org/3)

## Getting Started

### Prerequisites

- Node.js (v16 or higher) and npm (v7 or higher) installed on your machine.
- A free API key from [TMDB](https://www.themoviedb.org/signup).

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/omjaisatya/CineScope.git
   cd CineScope
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add your TMDB API key:

   ```env
   VITE_TMDB_API_KEY=your-key
   ```

   > **Note:** The project uses Vite, so environment variables must be prefixed with `VITE_`.

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) to view the app in your browser. The page will reload when you make changes.

## Environment Variables

- Copy `.env.example` to `.env` and fill in your key.

## Acknowledgements

- [TMDB](https://www.themoviedb.org/) for providing the awesome API.
- [React](https://reactjs.dev/) and [Vite](https://vite.dev/) for the amazing development experience.
- [Tailwind CSS](https://tailwindcss.com/) for the utility‑first styling framework.

**Made with ❤️ by Satya**  
*If you enjoy this project, consider giving it a ⭐ on [GitHub](https://github.com/omjaisatya/CineScope)!*
