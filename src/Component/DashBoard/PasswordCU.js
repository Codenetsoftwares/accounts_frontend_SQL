import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

const PasswordCU = ({ value, setFormData, name }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((values) => ({ ...values, [name]: value }));
  };
  return (
    <Form.Group>
      <Form.Label>
        {" "}
        <FaLock /> Password <span className="text-danger">*</span>
      </Form.Label>
      <InputGroup>
        <Form.Control
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={handleChange}
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
