import { useReducer } from "react";

export const initialState = {
    step: 1,
    selectedTicket: null,
    quantity: 1,
    totalAmount: 0,
    attendeesInfo: [
        {
            name: "",
            email: "",
            phone: "",
        },
    ],
};

export function bookingReducer(state, action) {
    switch (action.type) {
        case "NEXT_STEP":
            return { ...state, step: state.step + 1 };

        case "PREV_STEP":
            return { ...state, step: state.step - 1 };

        case 'SET_TICKET': {
            const total = action.payload.price * state.quantity
            return {
                ...state, selectedTicket: action.payload, totalAmount: total
            }
        }


        case 'SET_QUANTITY': {
            const qty = action.payload
            const attendeesInfo = Array.from(
                { length: qty },
                (_, i) => state.attendeesInfo[i] || { name: '', email: '', phone: '' }
            )
            const total = (state.selectedTicket?.price || 0) * qty
            return { ...state, quantity: qty, attendeesInfo, totalAmount: total }
        }

        case "SET_ATTENDEE_INFO": {
            const updated = [...state.attendeesInfo];

            updated[action.index] = {
                ...updated[action.index],
                [action.field]: action.value,
            };
            return { ...state, attendeesInfo: updated };
        }

        default:
            return state;
    }
}

