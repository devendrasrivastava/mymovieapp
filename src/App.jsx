import "./css/App.css";
import Favorites from "./pages/Favorites";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import Movies from "./pages/Movies";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./components/ProtectedRoute ";



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
      <main className="main-content app-wrapper">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/movies" element={<ProtectedRoute> <Movies /> </ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
    </MovieProvider>
    
  );
}


export default App
