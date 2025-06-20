import axios from "axios";
const VITE_API_BASE = import.meta.env.VITE_API_BASE

export const LoginRequest = async (user) => {
  try {
    const { data } = await axios.post(
      `${VITE_API_BASE}/user/signin`,
      user
    ); //Modificado
    return data;
  } catch (error) {
    throw new Error("Contraseña o usuarios no Validos");
  }
};

export const verifyTokenRequest = async (token) => { getVerifyPIDE
  const { data } = await axios.post(
    `${VITE_API_BASE}/user/verifyToken`,
    { token }
  ); //Modificado
  return data;
};

// Actualizar datos (Todo)
export const changeAll = async (user) => {
  const { data } = await axios.post(
    `${VITE_API_BASE}/user/changeAll`,
    user
  ); //Modificado
  return data;
};

// Actualizar datos (Usuario y Rol)
export const changeUserRol = async (user) => {
  const { data } = await axios.post(
    `${VITE_API_BASE}/user/changeUserRol`,
    user
  ); //Modificado
  return data;
};

// Listar Usuarios
export const getAllUsersRequest = async () => {
  const { data } = await axios.get(
    `${VITE_API_BASE}/user/getAllUsers`
  ); //Modificado
  return data;
};

// Listar Audicion
export const getAllAudit = async () => {
  const { data } = await axios.get(
    `${VITE_API_BASE}/user/getAllAudit`
  ); //Añadido
  return data;
};

// Listar DNI RENIEC
export const getAllDniReniec = async () => {
  const { data } = await axios.get(
    `${VITE_API_BASE}/user/getAllDniReniec`
  ); //Añadido
  return data;
};

// Buscar usuario por ID
export const getSeachId = async (userId) => {
  const { data } = await axios.get(
    `${VITE_API_BASE}/user/getSeachId/${userId}`
  ); //Modificado
  return data;
};

// Crear Usuario
export const getCreateUser = async (user) => {
  const { data } = await axios.post(
    `${VITE_API_BASE}/user/createUser`,
    user
  ); //Modificado
  return data;
};

// Eliminar Usuario
export const getDeleteUser = async (user) => {
  const { data } = await axios.post(
    `${VITE_API_BASE}/user/deleteUser`,
    user
  ); //Modificado
  return data;
};

// Eliminar Usuario
export const postDeleteDniReniec = async (user) => {
  const { data } = await axios.post(
    `${VITE_API_BASE}/user/deleteDniReniec`,
    user
  ); //Modificado
  
  return data;
};

// Estado Linea/Offline
export const getHeartbeat = async (userId) => {
  const { data } = await axios.post(
    `${VITE_API_BASE}/user/heartbeat`,
    { userId }
  ); //Modificado NEW
  return data;
};

// Cerrar Sesion
export const logoutRequest = async (userId) => {
  const { data } = await axios.post(`${VITE_API_BASE}/user/logout`, {
    userId,
  }); //Modificado NEW
  return data;
};

// Solicitar recuperación
export const postforgotPasswordRequest = async (name) => {
  const { data } = await axios.post(
    `${VITE_API_BASE}/user/forgot-password`,
    { name }
  ); //Modificado NEW
  return data;
};

// Enviar nueva contraseña
export const postResetPasswordRequest = async (token, password) => {
  const { data } = await axios.post(
    `${VITE_API_BASE}/user/reset-password`,
    { password, token }
  ); //Modificado NEW
  return data;
};

// Crear Audit
export const getCreateAudit = async (user) => {
  const { data } = await axios.post(
    `${VITE_API_BASE}/user/createAudit`,
    user
  ); //Añadido
  return data;
};

// Crear DNI RENIEC
export const postCreateDniReniec = async (user) => {
  const { data } = await axios.post(
    `${VITE_API_BASE}/user/createDniReniec`,
    user
  ); //Añadido
  return data;
};

// Actualizar DNI RENIEC
export const changeDniReniec = async (user) => {
  const { data } = await axios.post(
    `${VITE_API_BASE}/user/changeDniReniec`,
    user
  ); //Modificado
  return data;
};
 
// Verificar PIDE 
export const postVerifyPIDE = async (servicio) => { 
  const { data } = await axios.post(
    `${VITE_API_BASE}/user/verifyPide`,
    { servicio }
  ); //Modificado
  return data;
};

// Crear Service
export const postCreateService = async (servicio) => {
  const { data } = await axios.post(
    `${VITE_API_BASE}/user/createService`,
    servicio
  ); //Modificado
  return data;
};

// Listar Service
export const getAllService = async () => {
  const { data } = await axios.get(
    `${VITE_API_BASE}/user/getAllService`
  ); //Añadido
  return data;
};
