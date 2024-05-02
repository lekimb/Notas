import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import ColumnaNotas from "./ColumnaNotas";
import NotaActiva from "./NotaActiva";

export default function NotasApp() {
    const [notas, setNotas] = useImmer([
        {
            id: crypto.randomUUID(),
            created_at: new Date(),
            updated_at: null,
            titulo: "Lista de la compra",
            cuerpo: "Leche \nGalletas \nMandarinas ",
            deleted: false,
        },
        {
            id: crypto.randomUUID(),
            created_at: new Date(),
            updated_at: null,
            titulo: "Dichos populares",
            cuerpo: "A quien madruga, Dios le ayuda. \nNo por mucho madrugar amanece más temprano. \nMás vale pájaro en mano que ciento volando. ",
            deleted: false,
        },
        {
            id: crypto.randomUUID(),
            created_at: new Date(),
            updated_at: null,
            titulo: "Afinación guitalele",
            cuerpo: "A D G C E A",
            deleted: false,
        },
    ]);

    const [notaActiva, setNotaActiva] = useState(
        hayNotas() ? notas[0].id : null
    );

    function hayNotas() {
        let hayNotas = false;
        for (let nota of notas) {
            if (!nota.deleted) {
                hayNotas = true;
                break;
            }
        }
        return hayNotas;
    }

    function createNotaVacia() {
        return {
            id: crypto.randomUUID(),
            created_at: new Date(),
            updated_at: null,
            titulo: "",
            cuerpo: "",
            deleted: false,
        };
    }

    function addNota(nota) {
        setNotas((draft) => {
            draft.unshift(nota); // Añadir la nota en primer lugar
        });
    }

    function getNota(id) {
        let nota = null;
        for (let n of notas) {
            if (n.id === id) {
                nota = n;
                break;
            }
        }
        return nota;
    }

    function getIndex(id) {
        let index;
        for (let i = 0; i < notas.length; i++) {
            if (notas[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    function deleteNota(id) {
        let nextNotas = notas.map((nota) => {
            if (nota.id === id) {
                return { ...nota, deleted: true };
            }
            return nota;
        });
        setNotas(nextNotas);
        return nextNotas;
    }

    function isNotaVacia(id) {
        return getNota(id).titulo === "" && getNota(id).cuerpo === "";
    }

    function nuevaNota() {
        // Si la nota activa está vacía, no agregar una nueva nota
        if (notaActiva && isNotaVacia(notaActiva)) {
            return;
        }
        const nuevaNota = createNotaVacia();
        addNota(nuevaNota);
        setNotaActiva(nuevaNota.id);
        setTimeout(() => {
            document.getElementById("titulo").focus(); // Poner el focus en el input del título
        }, 100); // Sin el timeout da error porque todavía no está el elemento título en el DOM
    }

    return (
        <div className="text-stone-500 tracking-wide font-lexend">
            <h1 className="text-center font-bold text-4xl mt-10 mb-5">Notas</h1>
            <div className="px-5 max-w-4xl mx-auto">
                <button
                    onClick={nuevaNota}
                    className="p-2 border-orange-100 border-2 rounded-md mb-2 text hover:bg-orange-50"
                >
                    Nueva nota
                </button>
                <div className="flex justify-start">
                    <ColumnaNotas
                        notas={notas}
                        notaActiva={notaActiva}
                        setNotaActiva={setNotaActiva}
                        deleteNota={deleteNota}
                    />
                    <NotaActiva
                        notaActiva={notaActiva}
                        getNota={getNota}
                        setNotas={setNotas}
                        getIndex={getIndex}
                        nuevaNota={nuevaNota}
                    />
                </div>
            </div>
        </div>
    );
}
