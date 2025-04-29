import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";

// use command to create a new react app 'npm create vite@latest'
// select React then JavaScript
// use command to install dependencies 'npm install'
// use command to run the app 'npm run dev'
// use command to build the app 'npm run build'
// use command to preview the app 'npm run preview'
// jsx is the combination of JavaScript and HTML

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}


export default App
