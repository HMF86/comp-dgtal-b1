import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [actividad, setActividad] = useState(1);
  const [respuestas, setRespuestas] = useState(() =>
    JSON.parse(localStorage.getItem("respuestas")) || {}
  );

  const actividades = [
    {
      id: 1,
      titulo: "Identificación de argumentos y evaluación crítica",
      descripcion: `Se presenta un texto breve que expone una posición sobre un problema actual. El alumnado debe identificar los argumentos del texto y evaluarlos críticamente.`,
      instrucciones: `Lee el siguiente texto y responde: ¿Qué argumentos identificas en el texto? ¿Qué piensas de ellos?`,
      texto: `El plástico de un solo uso contribuye de manera significativa a la contaminación de los océanos. Sin embargo, eliminarlo podría tener consecuencias económicas graves para ciertas industrias.`,
    },
    {
      id: 2,
      titulo: "Detectar falacias",
      descripcion: `Se presentan cinco ejemplos de razonamientos falaces. El alumnado debe identificarlas y explicar por qué lo son.`,
      instrucciones: `Identifica la falacia presente en el siguiente argumento y explica por qué lo es.`,
      texto: `Si no reciclamos, el mundo se acabará mañana. Por lo tanto, debes empezar a reciclar ahora mismo.`,
    },
    {
      id: 3,
      titulo: "Creación de un argumento",
      descripcion: `Los estudiantes deben elegir un problema de su interés y escribir un argumento a favor o en contra, explicando las razones que lo sustentan.`,
      instrucciones: `Escribe un argumento relacionado con un problema que consideres importante. Explica por qué estás a favor o en contra.`,
      texto: "",
    },
  ];

  useEffect(() => {
    localStorage.setItem("respuestas", JSON.stringify(respuestas));
  }, [respuestas]);

  const handleInputChange = (e) => {
    const nuevaRespuesta = { ...respuestas, [actividad]: e.target.value };
    setRespuestas(nuevaRespuesta);
  };

  return (
    <div className="container">
      <h1 className="title">Argumentación Crítica</h1>
      <h2>{actividades[actividad - 1].titulo}</h2>
      <p>{actividades[actividad - 1].descripcion}</p>
      <p>
        <strong>Instrucciones:</strong>{" "}
        {actividades[actividad - 1].instrucciones}
      </p>
      <p>{actividades[actividad - 1].texto}</p>
      <textarea
        placeholder="Escribe tu respuesta aquí"
        value={respuestas[actividad] || ""}
        onChange={handleInputChange}
        className="input-area"
      ></textarea>
      <div className="button-group">
        <button
          onClick={() => setActividad((prev) => Math.max(prev - 1, 1))}
          disabled={actividad === 1}
        >
          Anterior
        </button>
        <button
          onClick={() =>
            setActividad((prev) => Math.min(prev + 1, actividades.length))
          }
          disabled={actividad === actividades.length}
        >
          Siguiente
        </button>
      </div>
      <div className="respuestas">
        <h3>Tus Respuestas:</h3>
        <ul>
          {Object.keys(respuestas).map((key) => (
            <li key={key}>
              <strong>Actividad {key}:</strong> {respuestas[key]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;


