
import { useState } from "react";

const TableUsers = ({ listUser = [] }) => {
    const [modalEditUsuario, setModalEditUsuario] = useState("desactive");
  return (
    <table className="text-sm rounded-[10px] overflow-hidden w-full text-center">
      <thead className="border-b">
        <tr>
          <th className="px-6 py-3">Usuario</th>
          <th className="px-6 py-3 ">Rol</th>
          <th className="px-6 py-3">Estado</th>
          <th className="px-6 py-3 ">Fecha de Creación</th>
          <th className="px-6 py-3">Fecha de Modificación</th>
          <th className="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody className="font-light">
        {listUser.length > 0 ? (
          listUser.map((user, index) => (
            <tr key={index}>
              <td className="px-6 py-4">{user.username}</td>
              <td className="px-6 py-4">{user.rol}</td>
              <td className="px-6 py-4">
                <div className="bg-[#0367C7] rounded-[5px] p-1 text-white">
                  <p>activo</p>
                </div>
              </td>
              <td className="px-6 py-4">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                {new Date(user.updatedAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <div>
                  <button onClick={() => setModalEditUsuario("editarUsuario")}>
                    editar
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No hay usuarios disponibles</td>
          </tr>
        )}
      </tbody>
      
    </table>
  );
};

export default TableUsers;
