import { createContext, useState } from 'react';

const RegistrationContext = createContext(null);

export const EventRegistrationContextProvider = ({ children }) => {
  const [registrationCodes, setRegistrationCodes] = useState([]);

  return (
    <RegistrationContext.Provider
      value={{
        registrationCodes,
        setRegistrationCodes,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export default RegistrationContext;
