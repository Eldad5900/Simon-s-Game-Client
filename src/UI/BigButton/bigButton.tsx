import React from "react"; 
import "./bigButton.scss";



interface ButtonProps {
  label: string;
  onClick: () => void;
}

const BigButton: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button className="btn" onClick={onClick}>{label}</button>
);

export default BigButton;