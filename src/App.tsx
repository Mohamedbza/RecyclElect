import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./layout/Layout";
import { Toaster } from 'sonner';
import { BuyPage } from "./pages/BuyPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { ContactPage } from "./pages/ContactPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";

const RootLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <Router>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 30px var(--shadow-color)',
              },
              classNames: {
                success: 'text-green-400',
              },
            }}
          />
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<HomePage />} />
                          <Route path="/j-achete" element={<BuyPage />} />
            <Route path="/favoris" element={<FavoritesPage />} />
            <Route path="/nous-contacter" element={<ContactPage />} />
            </Route>
          </Routes>
        </Router>
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
