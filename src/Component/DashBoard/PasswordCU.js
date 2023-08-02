import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';

const PasswordCU = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form.Group>
      <Form.Label> <FaLock/> Password <span 
      className="text-danger">*</span>
      
      </Form.Label>
      <InputGroup>
        <Form.Control
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <InputGroup.Text onClick={togglePasswordVisibility}>
          {!showPassword ? <FaEyeSlash /> : <FaEye />}
        </InputGroup.Text>
      </InputGroup>
    </Form.Group>
  );
};

export default PasswordCU;











