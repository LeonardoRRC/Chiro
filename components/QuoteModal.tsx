'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, UploadCloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Resend } from 'resend';
import toast from 'react-hot-toast';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export default function QuoteModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    nombre: '',
    celular: '',
    email: '',
    servicio: '',
    comentarios: '',
    archivo: null as File | null,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, archivo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading('Enviando solicitud...', { id: 'send' });

    const imageBase64 = imagePreview || '';

    const html = `
      <div style="font-family:sans-serif;color:#333">
        <h2>Solicitud de Cotización</h2>
        <p><strong>Nombre:</strong> ${form.nombre}</p>
        <p><strong>Celular:</strong> ${form.celular}</p>
        <p><strong>Email:</strong> ${form.email}</p>
        <p><strong>Servicio:</strong> ${form.servicio}</p>
        <p><strong>Comentario:</strong><br/>${form.comentarios}</p>
        <p><strong>Imagen Referencial:</strong></p>
        ${imageBase64 ? `<img src="${imageBase64}" style="max-width:400px;border:1px solid #ccc;border-radius:8px"/>` : 'No se adjuntó imagen'}
      </div>
    `;

    try {
      await resend.emails.send({
        from: 'cotizaciones@correos.milcraft.fun',
        to: 'bytessavvy@gmail.com',
        subject: 'Nueva Solicitud de Cotización',
        html,
      });
      toast.success('¡Cotización enviada!', { id: 'send' });
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Hubo un error al enviar', { id: 'send' });
    }
  };

  const portal = typeof window !== 'undefined' ? document.getElementById('portal') : null;

  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium shadow">
        Solicita Cotización
      </button>

      {mounted && portal && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-black/60 flex items-center justify-center px-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-6xl flex overflow-hidden shadow-xl rounded-tr-[3rem] rounded-br-[3rem] bg-white"
              >
                {/* Lado izquierdo */}
                <div className="bg-black text-white w-1/2 p-10 hidden md:flex flex-col justify-center relative">
                  <p className="text-red-500 text-sm mb-2">¿Tienes dudas?</p>
                  <h2 className="text-5xl font-extrabold leading-tight">
                    Cotiza con<br />Nosotros
                  </h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 left-4 text-white bg-black/70 hover:text-red-500 p-1 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Lado derecho */}
                <div className="w-full md:w-1/2 bg-white p-10 relative rounded-tr-[3rem] rounded-br-[3rem]">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" placeholder="Nombre y Apellidos" required
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        className="w-full border-b border-black text-sm py-2 outline-none"
                      />
                      <input type="tel" placeholder="Celular" required
                        value={form.celular}
                        onChange={(e) => setForm({ ...form, celular: e.target.value })}
                        className="w-full border-b border-black text-sm py-2 outline-none"
                      />
                      <input type="email" placeholder="Email" required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border-b border-black text-sm py-2 outline-none"
                      />
                      <select required
                        value={form.servicio}
                        onChange={(e) => setForm({ ...form, servicio: e.target.value })}
                        className="w-full border-b border-black text-sm py-2 outline-none bg-white"
                      >
                        <option value="">Servicios</option>
                        <option value="gigantografias">Gigantografías</option>
                        <option value="viniles">Viniles</option>
                        <option value="fotocheck">Fotocheck</option>
                      </select>
                    </div>

                    <textarea required placeholder="Comentarios"
                      value={form.comentarios}
                      onChange={(e) => setForm({ ...form, comentarios: e.target.value })}
                      className="w-full border-b border-black text-sm py-2 outline-none resize-none h-24"
                    />

                    <div>
                      <label className="block text-sm font-medium mb-2 text-black">Adjunta tu imagen referencial</label>
                      <label className="flex flex-col items-center justify-center w-full h-40 px-4 border-2 border-dashed border-gray-400 text-gray-500 hover:border-red-500 hover:text-red-500 transition rounded-xl cursor-pointer">
                        <UploadCloud className="w-8 h-8 mb-2" />
                        <span className="text-sm">Haz clic o arrastra tu imagen aquí</span>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                      </label>
                      {imagePreview && (
                        <img src={imagePreview} alt="Previsualización" className="mt-4 rounded-lg border w-full max-h-48 object-contain" />
                      )}
                    </div>

                    <div className="text-right pt-3">
                      <button type="submit" className="bg-[#e30613] hover:bg-red-700 text-white text-base font-semibold px-10 py-3 rounded-full inline-flex items-center gap-2 transition">
                        ENVIAR <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        portal
      )}
    </>
  );
}
