import React, { useState, useEffect } from 'react';
import { IMaskInput } from "react-imask";


interface SmartInputProps {
  value: string;
  onChange: (newValue: string) => void;
  mask?: string;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>['inputMode'];
  autoComplete?: React.InputHTMLAttributes<HTMLInputElement>['autoComplete'];
  placeholder?: string;
  label?: string;
  error?: string;
}

const SmartInput: React.FC<SmartInputProps> = ({
  value,
  onChange,
  mask,
  inputMode,
  autoComplete,
  placeholder = '',
  label = '',
  error = '',
}) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="mb-3">
      {label && <dt className="form-control-label fs-6 fw-bold text-secondary">{label}</dt>}
      
      {mask ? (
        <IMaskInput
          mask={mask}
          value={internalValue}
          onAccept={(val) => {
            setInternalValue(val);
            onChange(val);
          }}
          className={`form-control ${error ? 'is-invalid' : ''}`}
          inputMode={inputMode}
          autoComplete={autoComplete}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          value={internalValue}
          onChange={handleChange}
          className={`form-control ${error ? 'is-invalid' : ''}`}
          inputMode={inputMode}
          autoComplete={autoComplete}
          placeholder={placeholder}
        />
      )}

      {error && <small className="text-danger">{error}</small>}
    </div>
  );
};

export default SmartInput;