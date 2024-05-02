export default function NotaActiva({
    notaActiva,
    setNotas,
    getNota,
    getIndex,
    nuevaNota,
}) {
    function updateNotaTitulo(id, titulo) {
        setNotas((notas) => {
            notas.forEach((nota) => {
                if (nota.id === id) {
                    nota.titulo = titulo;
                    nota.updated_at = new Date();
                }
            });
        });
    }

    function updateNotaCuerpo(id, cuerpo) {
        setNotas((notas) => {
            notas.forEach((nota) => {
                if (nota.id === id) {
                    nota.cuerpo = cuerpo;
                    nota.updated_at = new Date();
                }
            });
        });
    }

    function handleTituloChange(e) {
        const titulo = e.target.value;
        updateNotaTitulo(notaActiva, titulo);
        setNotas((notas) => {
            array_move(notas, getIndex(notaActiva), 0);
        });
    }

    function handleCuerpoChange(e) {
        const cuerpo = e.target.value;
        updateNotaCuerpo(notaActiva, cuerpo);
        setNotas((notas) => {
            array_move(notas, getIndex(notaActiva), 0);
        });
    }

    function array_move(arr, old_index, new_index) {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing
    }

    function formatDate(date) {
        const hora = date.getHours();
        const minutos =
            ("" + date.getMinutes()).length === 1
                ? "0" + date.getMinutes()
                : date.getMinutes();
        const weekday = date.toLocaleString("es", { weekday: "short" });
        return weekday + ", " + hora + ":" + minutos;
    }

    return (
        <>
            {notaActiva ? (
                <div className="grow bg-stone-100 px-5 flex flex-col">
                    <input
                        id="titulo"
                        type="text"
                        placeholder="Título"
                        value={notaActiva ? getNota(notaActiva).titulo : ""}
                        disabled={!notaActiva}
                        className="block w-full bg-transparent py-3 font-bold text-2xl focus:outline-none border-b tracking-wide"
                        onChange={(e) => handleTituloChange(e)}
                    />
                    <textarea
                        id="cuerpo"
                        placeholder="Escribe algo..."
                        value={notaActiva ? getNota(notaActiva).cuerpo : ""}
                        disabled={!notaActiva}
                        className="mt-3 mb-2 block w-full bg-transparent grow focus:outline-none resize-none text-sm tracking-wide leading-relaxed"
                        onChange={(e) => handleCuerpoChange(e)}
                    />
                    <div className="sm:flex hidden justify-between text-xs py-2 border-t font-light">
                        <div>
                            {notaActiva
                                ? "Creada: " + formatDate(getNota(notaActiva).created_at)
                                : ""}
                        </div>
                        <div>
                            {notaActiva && getNota(notaActiva).updated_at
                                ? "Última edición: " +
                                  formatDate(getNota(notaActiva).updated_at)
                                : ""}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grow bg-stone-100 flex justify-center items-center ">
                    <div>
                        <div className="text-2xl font-bold text-stone-300 -mt-20">
                            No hay notas
                        </div>
                        <button
                            className="border-2 border-dashed border-stone-300 rounded-md block mx-auto p-2 mt-4 text-stone-300"
                            onClick={nuevaNota}
                        >
                            Nueva nota
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
