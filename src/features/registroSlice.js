// registrationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alimento: null,
  cantidad: null,
  fecha: null,
  usu: null
};

export const registroSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setAlimento: (state, action) => {
      state.alimento = action.payload;
    },
    setCantidad: (state, action) => {
      state.cantidad = action.payload;
    },
    setFecha: (state, action) => {
      state.fecha = action.payload;
    },
    setUsu: (state, action) => {
      state.usu = action.payload;
    }
  }
});

export const { setMensaje, setAlimento, setCantidad, setFecha , setUsu} = registroSlice.actions;

export default registroSlice.reducer;
