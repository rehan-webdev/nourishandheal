import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import HomePage from "@/pages/home-page";
import ProductPage from "@/pages/product-page";
import ResultsPage from "@/pages/results-page";
import BookPage from "@/pages/book-page";
import CartPage from "@/pages/cart-page";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="grain">
      <CartProvider>
        <ScrollToTop />
        <SiteHeader />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <SiteFooter />
        <CartDrawer />
      </CartProvider>
    </div>
  );
}
