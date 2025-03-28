import React, { useState } from 'react';
import SmartInput from '../smartInput/SmartInput';

interface EditUserFormProps {
  data: { name: string; email: string };
  onConfirm: (data: { name: string; email: string }) => void;
  handleClose?: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ data, onConfirm, handleClose  }) => {
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);

  const handleConfirm = () => {
    onConfirm({ name, email });
  };

  return (
    <div className='container card m-0'>
      <div className="container  d-flex justify-content-end p-2  mt-1 mb--5">
        <button
          type="button"
          className=" btn rounded-circle btn-close "
          onClick={handleClose}/>          
        
      </div>
      <h2>Edit User</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

<p className="fw-bold font-italic text-primary">Texto de teste</p>
      <SmartInput 
        value={email} 
        onChange={setEmail} 
        mask="000.000.000-00'" 
        inputMode="email" 
        autoComplete="email" 
        placeholder="Digite seu email"
        label="email"
        error={'tem erro'}
      />
      <button onClick={handleConfirm}>Save</button>
    </div>
  );
};

export default EditUserForm;

