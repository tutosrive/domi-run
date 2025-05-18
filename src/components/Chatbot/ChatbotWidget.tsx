import { useState } from 'react';
import axios from 'axios';

const questions = [
  '¿Para qué sirve este sistema?',
  '¿Dónde puedo registrar un nuevo conductor?',
  '¿En qué parte puedo realizar un pedido?',
  '¿Qué hago si hay un problema con una moto?',
  '¿Cómo veo el historial de pedidos?',
];

const AVATAR_URL = '/chatbot-avatar.png'; // Imagen debe estar en /public

export default function ChatbotWidget() {
  const [showOptions, setShowOptions] = useState(false);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askGemini = async (question: string) => {
    setLoading(true);
    setResponse('');
    const prompt = `Responde brevemente a la siguiente pregunta para un sistema de gestión de domicilios, debes saber que tenemos una sidebar donde esta restaurantes que redirige a todos los restaurantes existentes, en cada uno de estos se puede visualizar el menu, y los pedidos se hacen escogiendo los productos de dicho menu de dicho restaurante y luego llendo al carrito en la parte superior derecha y se le da en el boton de ordenar, el la misma sidebar hay una seccion que dice conductores, donde se prodan registrar poniendo sus datos(IMPORTANTE: recuerda que side bar es la barra lateral que aparece tocando las tres lineas de la parte superior izquierda), en caso de problemas u incovenientes de la moto se debe ir al apartado de conductores, escoger el conductor, despues la moto, y por ultimo hacer informe del error,y el historial de pedidos se puede ver en address tambien en la side bar, y en general es una aplicacion para gestionar los domicilios donde contamos con registro de restaurantes, conductores, nuevos usuarios, graficas interactivas de multiples datos de la pagina y un mapa interactivo para que sepa donde va su pedido : ${question}`;

    try {
      const { data } = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDw4UJfx_rMOQpx6hHACPZ9k_1Ea7rM5bk',
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta';
      setResponse(text);
    } catch (error) {
      console.error('Error al conectar con Gemini:', error);
      setResponse('Error al conectar con Gemini');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2">
      {showOptions && (
        <div className="bg-blue-100 text-black p-3 rounded shadow-md max-w-xs text-sm">
          {questions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => askGemini(q)}
              className="text-sm text-left hover:bg-gray-100 p-2 w-full rounded"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {response && (
        <div className="bg-blue-100 text-black p-3 rounded shadow-md max-w-xs text-sm">
          {loading ? 'Cargando...' : response}
        </div>
      )}

      <button
        onClick={() => {setShowOptions(!showOptions);setResponse('');}}
        className="rounded-full overflow-hidden border-2 border-gray-300 shadow-lg w-14 h-14"
        title="Ayuda"
      >
        <img src={AVATAR_URL} alt="chatbot" className="w-full h-full object-cover" />
      </button>
    </div>
  );
}
