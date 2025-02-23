import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

export default function ArgumentacionCritica() {
  const [actividad, setActividad] = useState(1);
  const [respuesta, setRespuesta] = useState("");
  const [retroalimentacion, setRetroalimentacion] = useState("");

  const actividades = [
    {
      titulo: "Identificación de argumentos y evaluación crítica",
      descripcion: `Se presenta un texto breve con argumentos a favor y en contra de una medida medioambiental. Los estudiantes deben identificar:
        1. La conclusión principal.
        2. Las premisas que la sustentan.
        3. Fortalezas y debilidades del argumento.`,
      instrucciones: `Lee el siguiente texto sobre la reducción de plásticos y responde a las preguntas.
        1. ¿Cuál es la conclusión principal?
        2. Identifica al menos dos premisas.
        3. ¿Qué fortalezas o debilidades encuentras en este argumento?`,
      texto: "El plástico de un solo uso contribuye enormemente a la contaminación marina. Reducir su uso podría salvar millones de vidas marinas, aunque algunos argumentan que las alternativas son más costosas.",
      evaluador: (respuesta) => {
        if (respuesta.toLowerCase().includes("reducir el plástico")) {
          return "Correcto: Has identificado la conclusión principal. Asegúrate de respaldarla con premisas del texto.";
        }
        return "Intenta nuevamente. Revisa cuál es la idea principal del texto.";
      },
    },
    {
      titulo: "Detectar falacias",
      descripcion: `Se presentan cinco ejemplos de razonamientos falaces en contextos medioambientales. Los estudiantes deben:
        1. Identificar la falacia presente en cada caso.
        2. Explicar brevemente por qué se considera una falacia.`,
      instrucciones: `Lee el siguiente ejemplo y selecciona la falacia correspondiente. Luego, justifica tu respuesta.`,
      texto: "Si no reciclamos, el mundo se acabará mañana.",
      evaluador: (respuesta) => {
        if (respuesta.toLowerCase().includes("falsa dicotomía")) {
          return "Correcto: Has identificado una falsa dicotomía. Este argumento presenta una exageración extrema.";
        }
        return "Revisa el ejemplo nuevamente. ¿Es realmente una consecuencia inevitable?";
      },
    },
    {
      titulo: "Creación de un argumento",
      descripcion: `Los estudiantes deben elegir un problema medioambiental local y construir un argumento sólido que incluya:
        1. Premisas justificadas.
        2. Una conclusión coherente.
        3. Evitación de falacias.`,
      instrucciones: `Escribe un argumento relacionado con un problema medioambiental en tu comunidad. Sigue la estructura de Premisas y Conclusión.`,
      evaluador: () => "Tu respuesta será evaluada por el docente." 
    },
  ];

  const actividadActual = actividades[actividad - 1];

  const manejarEnvio = () => {
    const feedback = actividadActual.evaluador(respuesta);
    setRetroalimentacion(feedback);
  };

  return (
    <div className="p-4">
      <Card>
        <CardContent>
          <h1 className="text-xl font-bold mb-4">Argumentación Crítica para un Futuro Sostenible</h1>
          <Progress value={(actividad / actividades.length) * 100} className="mb-4" />
          <h2 className="text-lg font-semibold mb-2">{actividadActual.titulo}</h2>
          <p className="mb-4">{actividadActual.descripcion}</p>
          <p className="mb-4 font-semibold">Instrucciones:</p>
          <p className="mb-4">{actividadActual.instrucciones}</p>
          {actividadActual.texto && <p className="mb-4 bg-gray-100 p-2 rounded">{actividadActual.texto}</p>}
          <Input
            placeholder="Escribe tu respuesta aquí"
            className="mb-4"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
          />
          <Button onClick={manejarEnvio}>Enviar</Button>
          {retroalimentacion && <p className="mt-4 text-green-600">{retroalimentacion}</p>}
        </CardContent>
      </Card>
      <div className="mt-4 flex justify-between">
        <Button
          onClick={() => {
            setActividad((prev) => Math.max(prev - 1, 1));
            setRespuesta("");
            setRetroalimentacion("");
          }}
          disabled={actividad === 1}
        >
          Anterior
        </Button>
        <Button
          onClick={() => {
            setActividad((prev) => Math.min(prev + 1, actividades.length));
            setRespuesta("");
            setRetroalimentacion("");
          }}
          disabled={actividad === actividades.length}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
