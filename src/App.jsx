import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Features from './components/Features';
import CartDrawer from './components/CartDrawer';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function getCartId(){
  let id = localStorage.getItem('cart_id');
  if(!id){
    id = crypto.randomUUID();
    localStorage.setItem('cart_id', id);
  }
  return id;
}

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  const onAddToCart = async (product)=>{
    const cart_id = getCartId();
    await fetch(`${API}/api/cart/add`,{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ cart_id, product_id: product.id, quantity: 1 })});
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar onCartClick={()=>setCartOpen(true)} />
      <main>
        <Hero />
        <Catalog onAddToCart={onAddToCart} />
        <Features />
      </main>
      <CartDrawer open={cartOpen} onClose={()=>setCartOpen(false)} />
      <footer className="py-10 text-center text-white/50">Built with love • Smooth like Shopify, more animated ✨</footer>
    </div>
  );
}

export default App
