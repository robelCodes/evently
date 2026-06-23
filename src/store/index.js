import { configureStore } from "@reduxjs/toolkit"
import createEventReducer from "./createEventSlice"


const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("createEventDraft", JSON.stringify(state.createEvent))
  } catch (e) {
    console.error("Failed to save draft", e)
  }
}

export const store = configureStore({
  reducer: {
    createEvent: createEventReducer,
  },
})


store.subscribe(() => {
  saveToLocalStorage(store.getState())
})