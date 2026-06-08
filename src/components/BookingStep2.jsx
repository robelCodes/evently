import { useState} from "react";
import FormInput from "./FormInput";



const BookingStep2 =({state, dispatch})=>{

    const [errors, setErrors] = useState({})

    const validate = () => {
    const newErrors = {}

    state.attendeesInfo.forEach((attendee, i) => {

    
    if (!attendee.name.trim()) {
      newErrors[`${i}-name`] = 'Please enter your name'
    }

    
    if (!attendee.email.includes('@') || !attendee.email.includes('.')) {
      newErrors[`${i}-email`] = 'Please enter a valid email'
    }

    
    if (attendee.phone.length < 10) {
      newErrors[`${i}-phone`] = 'Phone number is too short'
    }

  })

  setErrors(newErrors)
  const isValid = Object.keys(newErrors).length === 0
  return isValid
}



    return (
    <div className="booking-card">
      <h2>Attendee Details</h2>

      {state.attendeesInfo.map((attendee, i) => (
        <div key={i} style={{ marginBottom: 24 }}>

          
          {state.quantity > 1 && (
            <p style={{ fontWeight: 600, marginBottom: 12, color: 'var(--primary)' }}>
              Ticket {i + 1}
            </p>
          )}

          <FormInput
            label="Full Name"
            value={attendee.name}
            onChange={e => dispatch({
              type: 'SET_ATTENDEE_INFO',
              index: i,
              field: 'name',
              value: e.target.value
            })}
            error={errors[`${i}-name`]}
            placeholder="John Doe"
            required
          />

          <FormInput
            label="Email Address"
            type="email"
            value={attendee.email}
            onChange={e => dispatch({
              type: 'SET_ATTENDEE_INFO',
              index: i,
              field: 'email',
              value: e.target.value
            })}
            error={errors[`${i}-email`]}
            placeholder="john@example.com"
            required
          />

          <FormInput
            label="Phone Number"
            type="tel"
            value={attendee.phone}
            onChange={e => dispatch({
              type: 'SET_ATTENDEE_INFO',
              index: i,
              field: 'phone',
              value: e.target.value
            })}
            error={errors[`${i}-phone`]}
            placeholder="1234567890"
            helperText="Enter at least 10 digits"
            required
          />

        </div>
      ))}

      


      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <button
          className="btn btn-outline"
          style={{ flex: 1, justifyContent: 'center' }}
          onClick={() => dispatch({ type: 'PREV_STEP' })}
        >
          ← Back
        </button>
        <button
          className="btn btn-primary"
          style={{ flex: 1, justifyContent: 'center' }}
          onClick={() => { if (validate()) dispatch({ type: 'NEXT_STEP' }) }}
        >
          Continue →
        </button>
      </div>

    </div>
  )
}

export default BookingStep2