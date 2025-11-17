import { Sparkles, ShieldCheck, Layers } from 'lucide-react';

export default function Features(){
  const items = [
    { icon: Sparkles, title: 'Cinematic UI', desc: 'Spline 3D cover with buttery framer-motion transitions.' },
    { icon: Layers, title: 'Scalable Stack', desc: 'FastAPI backend + MongoDB for real product data.' },
    { icon: ShieldCheck, title: 'Secure checkout', desc: 'Session-based cart and demo checkout with taxes.' },
  ];
  return (
    <section id="features" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">Made for modern brands</h2>
        <p className="text-white/70 text-center mt-2 max-w-2xl mx-auto">Seamless motion, crisp typography, and delightful micro‑interactions out of the box.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {items.map((it, idx) => (
            <div key={idx} className="rounded-2xl p-6 bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
              <it.icon className="text-white" />
              <h3 className="text-white font-semibold mt-4">{it.title}</h3>
              <p className="text-white/70 mt-1">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
