import { Button } from 'primereact/button';
import React from 'react';

interface LogoutButtonComponentProps {
  classes?: string;
  labelText?: string;
  icon?: string;
  handleLogout: () => void;
}

const LogoutButtonComponent: React.FC<LogoutButtonComponentProps> = ({ classes, labelText, handleLogout, icon }) => {
  const text: string = labelText ?? 'Sign Out';
  const iconButton: string = icon ?? 'pi pi-sign-out';
  return <Button label={text} onClick={handleLogout} className={classes} icon={iconButton} />;
};

export default LogoutButtonComponent;
