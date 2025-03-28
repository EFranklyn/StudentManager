import React, { useState } from "react";
import SearchableSelect from "../searchableInput/SearchableInput";
import { ChoiceModel } from "../../models/choice.model";
import SmartInput from "../smartInput/SmartInput";

interface SocialMedia {
  type: string;
  url: string;
}

interface SocialMediaFormProps {
  value: SocialMedia[];
  onChange: (value: SocialMedia[]) => void;
  errors?: any
}

const SocialMediaForm: React.FC<SocialMediaFormProps> = ({ value, onChange, errors }) => {
  const [socialMedias, setSocialMedias] = useState<SocialMedia[]>(value || []);
    const socialMediaOptions: ChoiceModel[] = [
        {label:'Facebook',value:'Facebook'},
        {label:'Linkedin',value:'Linkedin'},
    ] 

  const handleAdd = () => {
    const newMedia = [...socialMedias, { type: "", url: "" }]
    setSocialMedias(newMedia);
    onChange(newMedia)
  };

  const handleRemove = (index: number) => {
    const updated = socialMedias.filter((_, i) => i !== index);
    setSocialMedias(updated);
    onChange(updated);
  };

  const handleChange = (index: number, key: keyof SocialMedia, newValue: string | null) => {
    if(!newValue) return
    const updated = [...socialMedias];
    updated[index][key] = newValue;
    setSocialMedias(updated);
    onChange(updated);
  };

  const getError = (index:number, type:string) => {
    return errors[`socialMedias.${index}.${type}`]
  }

  return (
    <div className="row ">
      <div className="row">
        <div className="col-3">
            <blockquote className="mb-2 display-7 lead tw-bold">Redes Sociais</blockquote>
            {(errors && errors['socialMedias']) && <small className="text-danger">{errors['socialMedias']}</small>}       
        </div>
        <div className="col-3">
            <button 
            disabled={socialMedias.length ==2}
            className="btn btn-outline-primary btn-sm" onClick={handleAdd}>Adicionar Rede Social</button>
        </div>
      </div>  
      {socialMedias.map((social, index) => (
        <div key={index} className="row ">
            <div className="col-3">
            <SearchableSelect
                label="Rede Social*"            
                options={socialMediaOptions} 
                value={social.type} 
                onChange={(e) => handleChange(index, "type", e && e.value!)}
                error={getError(index, 'type')}
            
          />  
          </div>
          <div className="col-5">
          <SmartInput
                value={social.url ?? ''} 
                onChange={(e) => handleChange(index, "url", e)}
                inputMode="url" 
                autoComplete="url" 
                placeholder={`Digite a Url ${ social.type && 'do ' + social.type }`}
                label="URL*"
                error={getError(index, 'url')}
            />
            
          </div>
          <div className="col-2 mt-4 pt-1 ">
            <button className="btn btn-close"          
          onClick={() => handleRemove(index)}/>
          </div>
        
        </div>
      ))}
    </div>
  );
};

export default SocialMediaForm;