import { Route, Routes } from "react-router-dom";
import Searchquote from "./page/Searchquote";
import Favourites from "./page/Favorites";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Searchquote />} />
        <Route path="/all-favorites" element={<Favourites />} />
      </Routes>
    </div>
  );
}

export default App;
