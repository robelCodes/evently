function FormInput({
  label,
  value,
  onChange,
  error = "",
  type = "text",
  placeholder = "",
  required = false,
  helperText = "",
}) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span style={{ color: 'var(--error)', marginLeft: 4 }}>*</span>}
      </label>
      <input
        className={`input ${error ? "input-error" : ""}`}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {helperText && !error && (
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
          {helperText}
        </p>
      )}
      {error && <span className="form-error">{error}</span>}
    </div>
  )
}

export default FormInput