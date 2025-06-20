import React, { useState } from "react";
import Modal from "./Modal";
import { useAsientos } from "../Hooks/useAsientos";
import { v4 as uuidv4 } from "uuid";
import useProvincias from "../Hooks/useProvincias";
const VITE_API_BASE = import.meta.env.VITE_API_BASE

const TableTitular = ({ dataJuridica }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { axiosAsientos, data } = useAsientos();
  const [asientos, setAsientos] = useState([]);
  const { provincias } = useProvincias();

  const openModal = async ({ zona, oficina, partida }) => {
  
    let departamento = null;
    let filter = provincias.filter((zone) => zone.descripcion == oficina);
    if (filter.length > 0) {
      departamento = filter[0];
    } else {
      throw Error("Nose encontro zona");
    }
    setIsModalOpen(true);
    await axiosAsientos({
      zona: departamento.codZona,
      oficina: departamento.codOficina,
      partida: partida,
    });
    setAsientos(data);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const downloadImg = async (paramsAsientos, item, type) => {
    let requestData = {};
    if (type == "ASIENTO") {
      requestData = {
        transaccion: paramsAsientos.transaccion,
        idImg: item.idImgAsiento,
        tipo: item.tipo,
        nroTotalPag: paramsAsientos.nroTotalPag,
        nroPagRef: item.listPag.nroPagRef,
        pagina: item.listPag.pagina,
      };
    } else if (type == "ASIENTO_OBJETO") {
      requestData = {
        transaccion: paramsAsientos.transaccion,
        idImg: paramsAsientos.listAsientos.idImgAsiento,
        tipo: paramsAsientos.listAsientos.tipo,
        nroTotalPag: paramsAsientos.nroTotalPag,
        nroPagRef: item.listPag.nroPagRef,
        pagina: item.listPag.pagina,
      };
    } else if (type == "FICHA") {
      requestData = {
        transaccion: paramsAsientos.transaccion,
        idImg: paramsAsientos.listFichas.idImgFicha,
        tipo: paramsAsientos.listFichas.tipo,
        nroTotalPag: paramsAsientos.nroTotalPag,
        nroPagRef: item.nroPagRef,
        pagina: item.pagina,
      };
    } else if (type == "FICHA_OBJETO") {
      requestData = {
        transaccion: paramsAsientos.transaccion,
        idImg: item.idImgFicha,
        tipo: item.tipo,
        nroTotalPag: paramsAsientos.nroTotalPag,
        nroPagRef: item.listPag.nroPagRef,
        pagina: item.listPag.pagina,
      };
    } else if (type == "FOLIO") {
      requestData = {
        transaccion: paramsAsientos.transaccion,
        idImg: paramsAsientos.listFolios.idImgFolio,
        tipo: paramsAsientos.listFolios.tipo,
        nroTotalPag: paramsAsientos.nroTotalPag,
        nroPagRef: item.nroPagRef,
        pagina: item.pagina,
      };
    } else if (type == "ASIENTO_ARRAY") {
      requestData = {
        transaccion: paramsAsientos.transaccion,
        idImg: item.idImgAsiento,
        tipo: item.tipo,
        nroTotalPag: paramsAsientos.nroTotalPag,
        nroPagRef: item.nroPagRef,
        pagina: item.pagina,
      };
    } else if ((type = "FOLIO_ARRAY")) {
      requestData = {
        transaccion: paramsAsientos.transaccion,
        idImg: item.idImgFolio,
        tipo: item.tipo,
        nroTotalPag: paramsAsientos.nroTotalPag,
        nroPagRef: item.nroPagRef,
        pagina: item.pagina,
      };
    }

    const response = await fetch(
      `${VITE_API_BASE}/sunarp/downloadAsientos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      throw new Error("Error en la solicitud al servidor");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "imagen_descargada.jpg";
    document.body.appendChild(a);
    a.click();
    window.open(url, "_blank");
    window.URL.revokeObjectURL(url);
  };
  return (
    <div className="overflow-x-auto rounded-md shadow-lg">
      <table className="text-sm min-w-full">
        <thead className="bg-slate-200">
          <tr>
            <th className="px-6 py-3 text-xl">#</th>
            <th className="px-6 py-3 ">Registro</th>
            <th className="px-6 py-3">Libro</th>
            <th className="px-6 py-3 ">Razón Social</th>
            <th className="px-6 py-3">Tipo Documento</th>
            <th className="px-6 py-3 ">Nº Documento</th>
            <th className="px-6 py-3">Nº Partida</th>
            <th className="px-6 py-3 ">Nº Placa</th>
            <th className="px-6 py-3">Estado</th>
            <th className="px-6 py-3">Zona</th>
            <th className="px-6 py-3">Oficina</th>
            <th className="px-6 py-3">Direccion</th>
            <th className="px-6 py-3">Asientos</th>
          </tr>
        </thead>
        <tbody className="bg-slate-100">
          {dataJuridica.map((elemento, index) => (
            <tr
              className="border-b border-gray-200 dark:border-gray-700"
              key={uuidv4()}
            >
              <th className="px-6 py-4">{index + 1}</th>
              <th className="px-6 py-4">{elemento.registro}</th>
              <td className="px-6 py-4">{elemento.libro}</td>
              <td className="px-6 py-4">{elemento.razonSocial}</td>
              <td className="px-6 py-4">{elemento.tipoDocumento}</td>
              <td className="px-6 py-4">
                {elemento.numeroDocumento !== undefined
                  ? elemento.numeroDocumento
                  : "-"}
              </td>
              <td className="px-6 py-4">{elemento.numeroPartida}</td>
              <td className="px-6 py-4">
                {elemento.numeroPlaca !== undefined
                  ? elemento.numeroPlaca
                  : "-"}
              </td>
              <td className="px-6 py-4">{elemento.estado}</td>
              <td className="px-6 py-4">{elemento.zona}</td>
              <td className="px-6 py-4">{elemento.oficina}</td>
              <td className="px-6 py-4">
                {elemento.direccion !== undefined ? elemento.direccion : "-"}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center">
                  {elemento.numeroPlaca == undefined && (
                    <button
                      className="bg-blue-500 text-white p-2 rounded"
                      onClick={() =>
                        openModal({
                          zona: elemento.zona,
                          oficina: elemento.oficina,
                          partida: elemento.numeroPartida,
                        })
                      }
                    >
                      Ver
                    </button>
                  )}
                  <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <h1 className="text-2xl font-bold mb-4">
                      Lista de Asientos
                    </h1>
                    <p className="font-bold">
                      Partida: {elemento.numeroPartida}
                    </p>
                    {/* {data && JSON.stringify(data.asientos)} */}
                    {data && data.asientos.listAsientos ? (
                      <>
                        {Array.isArray(data.asientos.listAsientos) ? (
                          data.asientos.listAsientos.map((asiento) => (
                            <div key={uuidv4()}>
                              <hr></hr>
                              <p className="py-1 font-bold">
                                ID de Imagen de Asiento:{" "}
                                <span className="font-normal">
                                  {asiento.idImgAsiento}
                                </span>
                              </p>
                              <p className="py-1 font-bold">
                                Número de Página:{" "}
                                <span className="font-normal">
                                  {asiento.numPag}
                                </span>
                              </p>
                              <div className="flex items-center justify-between">
                                <p className="font-bold">
                                  Tipo:{" "}
                                  <span className="font-normal">
                                    {asiento.tipo}
                                  </span>
                                </p>
                                {Array.isArray(asiento.listPag) ? null : (
                                  <button
                                    className="bg-blue-500 text-white p-2 rounded hover:opacity-90"
                                    onClick={() =>
                                      downloadImg(
                                        data.asientos,
                                        asiento,
                                        "ASIENTO"
                                      )
                                    }
                                  >
                                    Descargar
                                  </button>
                                )}
                              </div>
                              {Array.isArray(asiento.listPag) ? (
                                asiento.listPag.map((pag, index) => (
                                  <div key={uuidv4()}>
                                    <p className="py-1 font-bold">
                                      Número de Página de Referencia:{" "}
                                      <span className="font-normal">
                                        {pag.nroPagRef}
                                      </span>
                                    </p>
                                    <p className="py-1 font-bold">
                                      Página:{" "}
                                      <span className="font-normal">
                                        {pag.pagina}
                                      </span>
                                    </p>
                                    <button
                                      className="bg-blue-500 my-2 text-white p-2 rounded hover:opacity-90"
                                      onClick={() =>
                                        downloadImg(
                                          data.asientos,
                                          {
                                            nroPagRef: pag.nroPagRef,
                                            pagina: pag.pagina,
                                            idImgAsiento: asiento.idImgAsiento,
                                            tipo: asiento.tipo,
                                            numPag: asiento.numPag,
                                          },
                                          "ASIENTO_ARRAY"
                                        )
                                      }
                                    >
                                      Descargar
                                    </button>
                                    <hr />
                                  </div>
                                ))
                              ) : (
                                <>
                                  <p className="py-1 font-bold">
                                    Número de Página de Referencia:{" "}
                                    <span className="font-normal">
                                      {asiento.listPag.nroPagRef}
                                    </span>
                                  </p>
                                  <p className="py-1 font-bold">
                                    Página:{" "}
                                    <span className="font-normal">
                                      {asiento.listPag.pagina}
                                    </span>
                                  </p>
                                </>
                              )}
                            </div>
                          ))
                        ) : (
                          <>
                            <hr />
                            <h5 className="font-bold py-2">Asientos :</h5>
                            <p className="py-1 font-bold">
                              Id de Imagen:{" "}
                              <span className="font-normal">
                                {data.asientos.listAsientos.idImgAsiento}
                              </span>
                            </p>
                            <p className="py-1 font-bold">
                              Numero de Pagina de Referencia:{" "}
                              <span className="font-normal">
                                {data.asientos.listAsientos.listPag.nroPagRef}
                              </span>
                            </p>
                            <p className="py-1 font-bold">
                              Pagina:{" "}
                              <span className="font-normal">
                                {data.asientos.listAsientos.listPag.pagina}
                              </span>
                            </p>
                            <button
                              className="my-2 bg-blue-500 text-white p-2 rounded hover:opacity-90"
                              onClick={() =>
                                downloadImg(
                                  data.asientos,
                                  data.asientos.listAsientos,
                                  "ASIENTO_OBJETO"
                                )
                              }
                            >
                              Descargar
                            </button>
                          </>
                        )}
                      </>
                    ) : null}

                    {data && data.asientos && data.asientos.listFichas ? (
                      <>
                        <hr />
                        <h5 className="pt-2 font-bold">Ficha:</h5>
                        {Array.isArray(data?.asientos?.listFichas?.listPag) ? (
                          data.asientos.listFichas.listPag.map((ficha) => (
                            <div key={uuidv4()}>
                              <hr />
                              <p className="font-bold">
                                Número de Página de Referencia:{" "}
                                <span className="font-normal">
                                  {ficha.nroPagRef}
                                </span>
                              </p>
                              <p className="font-bold">
                                Página:{" "}
                                <span className="font-normal">
                                  {ficha.pagina}
                                </span>
                              </p>
                              <button
                                className="bg-blue-500 text-white p-2 rounded"
                                onClick={() =>
                                  downloadImg(data.asientos, ficha, "FICHA")
                                }
                              >
                                Descargar
                              </button>
                            </div>
                          ))
                        ) : (
                          <>
                            <p className="font-bold">
                              Id de Imagen:{" "}
                              <span className="font-normal">
                                {data.asientos.listFichas.idImgFicha}
                              </span>
                            </p>
                            <p className="font-bold">
                              Número de Página de Referencia:{" "}
                              <span className="font-normal">
                                {data.asientos.listFichas.listPag.nroPagRef}
                              </span>
                            </p>
                            <p className="font-bold">
                              Página:{" "}
                              <span className="font-normal">
                                {data.asientos.listFichas.listPag.pagina}
                              </span>
                            </p>
                            <button
                              className="my-2 bg-blue-500 text-white p-2 rounded"
                              onClick={() =>
                                downloadImg(
                                  data.asientos,
                                  data.asientos.listFichas,
                                  "FICHA_OBJETO"
                                )
                              }
                            >
                              Descargar
                            </button>
                          </>
                        )}
                      </>
                    ) : null}

                    {data?.asientos?.listFolios ? (
                      <>
                        <hr />
                        <h5 className="font-bold">Folio :</h5>
                        {Array.isArray(data.asientos.listFolios) &&
                        data.asientos.listFolios.length > 0
                          ? data.asientos.listFolios.map((folio) => (
                              <div key={uuidv4()}>
                                <p className="font-bold">
                                  Id de imagen:{" "}
                                  <span className="font-normal">
                                    {folio.idImgFolio}
                                  </span>
                                </p>
                                <p className="font-bold">
                                  Número de Página de Referencia:{" "}
                                  <span className="font-normal">
                                    {folio.nroPagRef}
                                  </span>
                                </p>
                                <p className="font-bold">
                                  Página:{" "}
                                  <span className="font-normal">
                                    {folio.pagina}
                                  </span>
                                </p>
                                <button
                                  className="my-2 bg-blue-500 text-white p-2 rounded0"
                                  onClick={() =>
                                    downloadImg(
                                      data.asientos,
                                      {
                                        nroPagRef: folio.nroPagRef,
                                        pagina: folio.pagina,
                                        idImgFolio: folio.idImgFolio,
                                        tipo: folio.tipo,
                                        numPag: folio.nroTotalPag,
                                      },
                                      "FOLIO_ARRAY"
                                    )
                                  }
                                >
                                  Descargar
                                </button>
                              </div>
                            ))
                          : null}
                      </>
                    ) : null}
                  </Modal>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableTitular;
