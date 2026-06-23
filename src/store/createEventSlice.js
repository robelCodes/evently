import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { supabase } from "../lib/supabase"


const savedDraft = localStorage.getItem("createEventDraft")
const draftState = savedDraft ? JSON.parse(savedDraft) : null

const initialState = draftState || {
  step: 1, 
  title: "",
  description: "",
  category: "",
  image: "",  
  date: "",
  time: "",
  venue: "",
  location: "",
  ticketTypes: [{ id: 1, name: "General", price: 0, available: 100 }],  
  status: "idle", 
  error: null,
}


export const publishEvent = createAsyncThunk(
  "createEvent/publish",
  async (eventData, { rejectWithValue }) => {
    try {
      
      const { data: event, error: eventError } = await supabase
        .from("events")
        .insert([{
          title: eventData.title,
          description: eventData.description,
          category: eventData.category,
          image: eventData.image,
          event_date: eventData.date,
          event_time: eventData.time,
          venue: eventData.venue,
          location: eventData.location,
          organizer_name: "user1",
        }])
        .select()
        .single()

      if (eventError) throw eventError

      
      const ticketRows = eventData.ticketTypes.map((t) => ({
        event_id: event.id,
        name: t.name,
        price: Number(t.price),
        available: Number(t.available),
      }))

      const { error: ticketError } = await supabase
        .from("ticket_types")
        .insert(ticketRows)

      if (ticketError) throw ticketError

      return event
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const createEventSlice = createSlice({
  name: "createEvent",
  initialState,
  reducers: {
    nextStep: (state) => { state.step += 1 },
    prevStep: (state) => { state.step -= 1 },

    updateField: (state, action) => {
      const { field, value } = action.payload
      state[field] = value
    },

    addTicketType: (state) => {
      state.ticketTypes.push({
        id: Date.now(),
        name: "",
        price: 0,
        available: 100,
      })
    },

    removeTicketType: (state, action) => {
      if (state.ticketTypes.length > 1) {
        state.ticketTypes = state.ticketTypes.filter(
          (t) => t.id !== action.payload
        )
      }
    },

    updateTicketType: (state, action) => {
      const { id, field, value } = action.payload
      const ticket = state.ticketTypes.find((t) => t.id === id)
      if (ticket) ticket[field] = value
    },

    resetForm: (state) => {
      localStorage.removeItem("createEventDraft")
      return { ...initialState, status: "idle", error: null }
    },
  },

  
  extraReducers: (builder) => {
    builder
      .addCase(publishEvent.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(publishEvent.fulfilled, (state) => {
        state.status = "success"
        localStorage.removeItem("createEventDraft")
      })
      .addCase(publishEvent.rejected, (state, action) => {
        state.status = "error"
        state.error = action.payload
      })
  },
})

export const {
  nextStep,
  prevStep,
  updateField,
  addTicketType,
  removeTicketType,
  updateTicketType,
  resetForm,
} = createEventSlice.actions

export default createEventSlice.reducer