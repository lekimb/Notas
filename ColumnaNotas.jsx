import { MdDeleteOutline } from "react-icons/md";

export default function ColumnaNotas({
    notas,
    notaActiva,
    setNotaActiva,
    deleteNota,
}) {
    function handleClick(e, id) {
        if (e.target.id === "delete" || e.target.id === "delete-icon") {
            return;
        }
        if (id === notaActiva) {
            return;
        }
        setNotaActiva(id);
        eliminarNotasVacias();
        document.getElementById("cuerpo").focus(); // Poner focus en el cuerpo de la nota
    }

    function eliminarNotasVacias() {
        let nextNotas;
        for (let i = 0; i < notas.length; i++) {
            if (
                notas[i].titulo === "" &&
                notas[i].cuerpo === "" &&
                !notas[i].deleted
            ) {
                nextNotas = deleteNota(notas[i].id);
            }
        }
        console.log("Eliminar notas vacías", nextNotas);
    }

    function handleDelete(id) {
        // Eliminar la nota
        let nextNotas = deleteNota(id);
        // Asignar nueva nota activa después de borrar la anterior solo si la nota eliminada coincide con la nota activa actual
        if (notaActiva === id) {
            setNotaActiva(() => {
                let notaActiva = null;
                for (let nota of nextNotas) {
                    if (!nota.deleted) {
                        notaActiva = nota.id;
                        break;
                    }
                }
                return notaActiva;
            });
        }
    }

    function formatearTexto(text) {
        return text.split("\n")[0]; // Dejar solo la primera línea
    }

    return (
        <div className="bg-orange-100 w-80 h-[400px] overflow-y-auto scrollbar">
            {notas.map((nota) => {
                let activa = nota.id === notaActiva;
                if (!nota.deleted) {
                    return (
                        <div
                            key={nota.id}
                            onClick={(e) => handleClick(e, nota.id)}
                            className={`${
                                activa
                                    ? "bg-orange-200 hover:cursor-default"
                                    : "hover:cursor-pointer"
                            } border-b border-b-orange-200 flex h-20 `}
                        >
                            {nota.titulo || nota.cuerpo ? (
                                <div className="grow min-w-0 pl-4 pr-2 py-4 text-sm">
                                    <h2 className="font-bold truncate">
                                        {formatearTexto(nota.titulo)}
                                    </h2>
                                    <p
                                        className={`${
                                            nota.titulo ? "mt-2" : ""
                                        } truncate`}
                                    >
                                        {formatearTexto(nota.cuerpo)}
                                    </p>
                                </div>
                            ) : (
                                <div className="grow min-w-0 flex items-center pl-5 text-sm text-orange-400">
                                    <p>Nota vacía</p>
                                </div>
                            )}
                            <div
                                id="delete"
                                className=" shrink-0 self-stretch flex items-center justify-center w-10 text-lg hover:cursor-pointer hover:bg-orange-300"
                                onClick={() => handleDelete(nota.id)}
                            >
                                <MdDeleteOutline id="delete-icon" />
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
}
