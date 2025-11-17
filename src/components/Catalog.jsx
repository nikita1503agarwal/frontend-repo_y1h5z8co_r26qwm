import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Catalog({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch(`${API}/api/categories`).then(r => r.json()).then(setCategories).catch(() => setCategories([]));
    fetch(`${API}/api/products`).then(r => r.json()).then(setProducts).catch(() => setProducts([]));
  }, []);

  const filtered = useMemo(() => {
    let list = products;
    if (active !== 'all') list = list.filter(p => p.category === active);
    if (query.trim()) list = list.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    return list;
  }, [products, active, query]);

  return (
    <section id="catalog" className="relative py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Featured products</h2>
            <p className="text-white/70 mt-2">Curated selection with smooth micro-interactions.</p>
          </div>
          <div className="flex items-center gap-3">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products" className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20" />
            <div className="flex gap-2 overflow-x-auto">
              <button onClick={()=>setActive('all')} className={`px-3 py-2 rounded-lg text-sm ${active==='all'?'bg-white text-slate-900':'bg-white/10 text-white'} transition`}>All</button>
              {categories.map(c => (
                <button key={c.slug} onClick={()=>setActive(c.slug)} className={`px-3 py-2 rounded-lg text-sm ${active===c.slug?'bg-white text-slate-900':'bg-white/10 text-white'} transition`}>{c.name}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <AnimatePresence>
            {filtered.map(p => (
              <motion.div key={p.id} layout initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:20}} transition={{duration:0.3}} className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1555529771-35a38c9ba8b0?q=80&w=1200&auto=format&fit=crop'} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold tracking-tight">{p.title}</h3>
                  <p className="text-white/70 text-sm line-clamp-2 mt-1">{p.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-white">
                      <span className="text-lg font-bold">${'{'}p.price{'}'}</span>
                      {p.compare_at_price ? <span className="ml-2 text-white/50 line-through text-sm">${'{'}p.compare_at_price{'}'}</span> : null}
                    </div>
                    <button onClick={()=>onAddToCart(p)} className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold shadow hover:shadow-lg transition">Add</button>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-b from-transparent via-transparent to-blue-500/10" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
