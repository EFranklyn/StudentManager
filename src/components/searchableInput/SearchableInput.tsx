import React, { useState, useRef, useEffect } from "react";
import { ChoiceModel } from "../../models/choice.model";

interface SearchableSelectProps {
  options: ChoiceModel[];
  value: string;
  onChange: (value: ChoiceModel | null) => void;
  placeholder?: string;
  label?: string;
  error?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ 
    options, 
    value, 
    onChange,
    label, 
    error = '',  
    placeholder = "Pesquisar..." }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    (option.label ?? '').toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (selectedValue: ChoiceModel | null) => {
    onChange(selectedValue);
    setIsOpen(false);
    // setSearch(""); // Limpa o input após seleção
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    // Atualiza o input com o nome da opção selecionada
    const selectedOption = options.find((option) => option.value === value);
    setSearch(selectedOption ? selectedOption.label! : "");
  }, [value, options]);

  useEffect(() => {
    if (search === "") {
      handleSelect(null); // Remove a seleção
    }
  }, [search]);

  return (
    <div className="position-relative w-100 mb-3" ref={dropdownRef}>
        {label && <span className="form-control-label fs-6 fw-bold text-secondary">{label}</span>}
        
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        autoComplete="off"
      />

      {error && <small className="text-danger">{error}</small>}

      {isOpen && (
        <div className="dropdown-menu show w-100" style={{ maxHeight: "200px", overflowY: "auto" }}>
          {filteredOptions.length === 0 ? (
            <div className="dropdown-item text-muted">Nenhum resultado</div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`dropdown-item ${option.value === value ? "active" : ""}`}
                onClick={() => handleSelect(option)}
                style={{ cursor: "pointer" }}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}      
    </div>    
  );
};

export default SearchableSelect;