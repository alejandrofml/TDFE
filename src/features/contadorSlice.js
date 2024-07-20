import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cuenta: 0
}

export const contadorSlice = createSlice({
    name:"contador",
    initialState,
    reducers:{
        incrementar: (state) => {
            state.cuenta++;
        },
        decrementar:(state) => {
            state.cuenta--;
        }
    }

})

export const {incrementar, decrementar} = contadorSlice.actions;
export default contadorSlice.reducer;