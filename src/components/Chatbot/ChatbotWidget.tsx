import { JSX, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import axios from 'axios';
import parse from 'html-react-parser';

const questions = ['¿Para qué sirve este sistema?', '¿Dónde puedo registrar un nuevo conductor?', '¿En qué parte puedo realizar un pedido?', '¿Qué hago si hay un problema con una moto?', '¿Cómo veo el historial de pedidos?'];

const AVATAR_URL = '/chatbot-avatar.png'; // Imagen debe estar en /public

export default function ChatbotWidget() {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [chatbotOpen, setChatbotOpen] = useState<boolean>(false);

  // Shortcut to open/close ChatBot
  useHotkeys(
    'ctrl+enter',
    (event) => {
      event.preventDefault();
      setChatbotOpen((prev) => !prev);
      setShowOptions((prev) => !prev);
    },
    { enableOnFormTags: ['input', 'textarea'], preventDefault: true, keyup: true },
    [setChatbotOpen],
  );
  const askGemini = async (question: string) => {
    setLoading(true);
    setResponse('Pensando...');

    const prompt = `Contexto:
Eres el chatbot de la página de domicilios Domi Run. Eres colombiano, muy alegre, siempre respetuoso y respondes de forma breve y clara, sin groserías.

Contexto técnico:
La web está escrita en React 18.2.0 y usamos html-react-parser para convertir texto HTML en componentes JSX.

Formato de respuesta:
- Solo HTML puro, nada de markdown, código, texto plano o caracteres de escape.
- Prohibido cualquier bloque de código o comillas especiales.
- Para enfatizar el nombre de la web “Domi Run”, úsalo dentro de una etiqueta fuerte.
- Para párrafos, usa la etiqueta de párrafo.
- Para listas desordenadas, usa la etiqueta de lista desordenada con elementos de lista.
- Para listas ordenadas, usa la etiqueta de lista ordenada con elementos de lista.
- No incluyas etiquetas de documento ni comentarios.
- **Incluye al menos un emoji de comida en cada frase** (por ejemplo 🍕, 🍔, 🌮, 🍣) para que la respuesta sea más amena.

Descripción de la app (solo para contexto, no va en la respuesta):
– La barra lateral (las tres rayas en la esquina superior izquierda) tiene:
  • Restaurantes, que muestra todos los restaurantes y sus menús.
  • Conductores, para registrar y luego reportar problemas con motos.
  • Address, para ver el historial de pedidos.
– El usuario elige productos del menú, va al carrito en la esquina superior derecha y pulsa Ordenar.
– Extras: registro de usuarios, gráficas interactivas y mapa de seguimiento.

Instrucción final:
Responde brevemente a la pregunta:
> ${question}
`;

    try {
      const { data } = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDw4UJfx_rMOQpx6hHACPZ9k_1Ea7rM5bk',
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Not response, try again';
      setResponse(text);
    } catch (error) {
      console.error('Error to connect Gemini:', error);
      setResponse('Error to connect Gemini');
    } finally {
      setLoading(false);
    }
  };

  const optionsJsx = (
    <div className="bg-blue-100 text-black p-3 rounded shadow-md max-w-xs text-sm">
      {questions.map((q, idx) => (
        <button key={idx} onClick={() => askGemini(q)} className="text-sm text-left hover:bg-gray-100 p-2 w-full rounded">
          {q}
        </button>
      ))}
    </div>
  );
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2">
      {chatbotOpen && (
        <>
          {showOptions && optionsJsx}

          {response && <div className="bg-white/30 backdrop-blur-sm text-white p-3 rounded shadow-md max-w-xs max-h-[50vh] overflow-y-scroll text-sm">{loading ? 'Pensando...' : <div>{parse(response)}</div>}</div>}
        </>
      )}
      <button
        onClick={(e) => {
          e.preventDefault();
          setChatbotOpen((prev) => !prev);
          setShowOptions((prev) => !prev);
        }}
        className="rounded-full overflow-hidden border-2 border-gray-300 shadow-lg w-14 h-14 mb-6 me-1"
        title="Ayuda"
      >
        <img src={AVATAR_URL} alt="chatbot" className="w-full h-full object-cover" />
      </button>
    </div>
  );
}
