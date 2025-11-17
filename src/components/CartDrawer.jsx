import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function getCartId(){
  let id = localStorage.getItem('cart_id');
  if(!id){
    id = crypto.randomUUID();
    localStorage.setItem('cart_id', id);
  }
  return id;
}

export default function CartDrawer({ open, onClose }){
  const [items, setItems] = useState([]);
  const cartId = getCartId();

  const refresh = () => {
    fetch(`${API}/api/cart?cart_id=${cartId}`).then(r=>r.json()).then(setItems).catch(()=>setItems([]));
  };

  useEffect(()=>{ if(open) refresh(); }, [open]);

  const remove = async (id)=>{
    await fetch(`${API}/api/cart/remove`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id }) });
    refresh();
  };

  const checkout = async ()=>{
    const res = await fetch(`${API}/api/checkout`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ cart_id: cartId })});
    const data = await res.json();
    alert(`Subtotal: $${data.subtotal}\nTotal (tax incl.): $${data.total}`);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <motion.div initial={{x: 400}} animate={{x:0}} exit={{x:400}} transition={{type:'spring', damping:24, stiffness:200}} className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-white/10 p-6 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-lg font-semibold">Your cart</h3>
              <button onClick={onClose} className="text-white/60 hover:text-white">Close</button>
            </div>
            <div className="mt-6 space-y-4">
              {items.length === 0 && <p className="text-white/60">Your cart is empty.</p>}
              {items.map(it => (
                <div key={it.id} className="flex gap-3 items-center bg-white/5 border border-white/10 rounded-xl p-3">
                  <img src={it.product.images?.[0]} alt="" className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="text-white font-medium">{it.product.title}</div>
                    <div className="text-white/60 text-sm">Qty {it.quantity}</div>
                  </div>
                  <div className="text-white">${'{'}(it.product.price * it.quantity).toFixed(2){'}'}</div>
                  <button onClick={()=>remove(it.id)} className="text-white/60 hover:text-white ml-2">Remove</button>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button onClick={checkout} className="w-full py-3 rounded-xl bg-white text-slate-900 font-semibold">Checkout</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
