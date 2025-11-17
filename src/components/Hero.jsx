import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/IKzHtP5ThSO83edK/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/40 to-slate-900/80 pointer-events-none" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col items-start justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="backdrop-blur-sm bg-slate-900/30 border border-white/10 rounded-2xl p-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/90 ring-1 ring-white/20 mb-4">New • Fintech-ready templates</span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white tracking-tight">
            Build a modern shopping experience
          </h1>
          <p className="mt-4 text-white/80 max-w-xl">
            A sleek, animated storefront with immersive 3D, buttery transitions, and a blazing fast backend.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href="#catalog" className="px-5 py-3 rounded-xl bg-white text-slate-900 font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-400/30 transition">Explore products</a>
            <a href="#features" className="px-5 py-3 rounded-xl bg-white/10 text-white font-semibold ring-1 ring-white/20 hover:bg-white/15 transition">Why choose us</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
