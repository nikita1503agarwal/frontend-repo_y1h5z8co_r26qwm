import { ShoppingCart, Menu, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar({ onCartClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition ${scrolled ? 'backdrop-blur bg-slate-900/70 border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-orange-400" />
          <span className="text-white font-semibold">BlazeCart</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-white/80">
          <a href="#catalog" className="hover:text-white">Catalog</a>
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center gap-2 text-white/80 hover:text-white">
            <Search size={18} />
            <span>Search</span>
          </button>
          <button onClick={onCartClick} className="relative p-2 rounded-lg bg-white/10 hover:bg-white/15 text-white">
            <ShoppingCart size={18} />
            <span className="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 rounded bg-orange-500 text-white">Cart</span>
          </button>
          <button className="md:hidden p-2 rounded-lg bg-white/10 text-white">
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
