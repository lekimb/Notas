import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import ColumnaNotas from ".ColumnaNotas";
import NotaActiva from "./NotaActiva";

export default function NotasApp() {
    const [notas, setNotas] = useImmer([
        {
            id: crypto.randomUUID(),
            created_at: new Date(),
            updated_at: null,
            titulo: "Lista de la compra",
            cuerpo: "Leche, manzanas, arroz, tomates, mandarinas",
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

    function createNota(titulo, cuerpo) {
        return {
            id: crypto.randomUUID(),
            created_at: new Date(),
            updated_at: null,
            titulo: titulo,
            cuerpo: cuerpo,
            deleted: false,
        };
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

    useEffect(() => {
        console.log("Nota activa: " + notaActiva);
    }, [notaActiva]);

    useEffect(() => {
        console.log(notas);
    }, [notas]);

    function nuevaNota() {
        // Si la nota activa está vacía, no agregar una nueva nota
        if (
            notaActiva &&
            getNota(notaActiva).titulo === "" &&
            getNota(notaActiva).cuerpo === ""
        ) {
            return;
        }
        const nuevaNota = createNotaVacia();
        addNota(nuevaNota);
        setNotaActiva(nuevaNota.id);
        setTimeout(() => {
            document.getElementById("titulo").focus(); // Poner el focus en el input del título
        }, 100); // Sin el timeout da error porque todavía no está el título en el DOM
    }

    return (
        <div class="text-stone-500 tracking-wide font-lexend">
            <h1 className="text-center font-bold text-4xl mt-10 mb-5">Notas</h1>
            <div className="max-w-[700px] mx-auto">
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
