import { useDispatch, useSelector } from "react-redux";
import { updateField, nextStep } from "../store/createEventSlice";
import FormInput from "./FormInput";
import { useState } from "react";

const CATEGORIES = [
  "Technology",
  "Music",
  "Sports",
  "Arts",
  "Business",
  "Food",
  "Health",
  "Education",
  "Entertainment",
  "Other",
];

function CreateEventStep1() {
  const dispatch = useDispatch();
  const { title, description, category, image } = useSelector(
    (state) => state.createEvent,
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!category) newErrors.category = "Please select a category";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="booking-card">
      <h2>Basic Info</h2>

      <FormInput
        label="Event Title"
        value={title}
        onChange={(e) =>
          dispatch(updateField({ field: "title", value: e.target.value }))
        }
        error={errors.title}
        placeholder="Humber hiring event 2026"
        required
      />

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>
          Description <span style={{ color: "var(--error)" }}>*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) =>
            dispatch(
              updateField({ field: "description", value: e.target.value }),
            )
          }
          placeholder="Say something about the event..."
          rows={4}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text-primary)",
            fontSize: 14,
            resize: "vertical",
            fontFamily: "inherit",
          }}
        />
        {errors.description && (
          <p style={{ color: "var(--error)", fontSize: 12, marginTop: 4 }}>
            {errors.description}
          </p>
        )}
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>
          Category <span style={{ color: "var(--error)" }}>*</span>
        </label>
        <select
          value={category}
          onChange={(e) =>
            dispatch(updateField({ field: "category", value: e.target.value }))
          }
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text-primary)",
            fontSize: 14,
          }}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p style={{ color: "var(--error)", fontSize: 12, marginTop: 4 }}>
            {errors.category}
          </p>
        )}
      </div>

      <FormInput
        label="Image URL"
        value={image}
        onChange={(e) =>
          dispatch(updateField({ field: "image", value: e.target.value }))
        }
        placeholder="https://example.com/image.jpg"
        helperText="Paste a link to your event image"
      />

      {image && (
        <img
          src={image}
          alt="Preview"
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            borderRadius: "var(--radius)",
            marginBottom: 16,
          }}
          onError={(e) => (e.target.style.display = "none")}
        />
      )}

      <button
        className="btn btn-primary"
        style={{ width: "100%", justifyContent: "center" }}
        onClick={() => {
          if (validate()) dispatch(nextStep());
        }}
      >
        Continue →
      </button>
    </div>
  );
}

export default CreateEventStep1;
