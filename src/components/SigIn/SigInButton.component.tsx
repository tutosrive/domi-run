import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Button } from 'primereact/button';

interface SigInButtonProps {
  classes?: string; // Styles Classes
  labelText?: string; // Text Content
  /* Styles css, property object {with: 'red', color: 'white'} */
  styles?: object;
  icon?: string; // Optional icon
}

const SigInButtonComponent: React.FC<SigInButtonProps> = ({ classes, labelText, styles, icon }) => {
  const navigate = useNavigate();
  let classNames: string = classes ?? 'btn btn-primary';
  if (!classNames.includes('btn')) classNames += ' btn';
  const text: string = labelText ?? 'SigIn';
  return <Button label={text} icon={icon ?? ''} className={classNames} onClick={() => navigate('/login')} style={styles} />;
};

export default SigInButtonComponent;
