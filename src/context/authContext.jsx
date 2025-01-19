import { createContext, useState, useEffect } from 'react';
import encryptStorage from '@/lib/encryptedStorage';
import { fetchUser, refreshTokenApi, login, logout } from '@/api/auth';

export const AuthContext = createContext({
  accessToken: null,
  refreshToken: null,
  setAccessToken: () => null,
  setRefreshToken: () => null,
});

// Helper function to retrieve tokens from encrypted storage
const retrieveTokenFromEncryptedStorage = () => {
  try {
    const accessToken = encryptStorage.getItem('jwtAccessToken') || null;
    const refreshToken = encryptStorage.getItem('jwtRefreshToken') || null;
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Error retrieving tokens:', error);
    return { accessToken: null, refreshToken: null };
  }
};

export const AuthContextProvider = ({ children }) => {
  const { accessToken: initialAccessToken, refreshToken: initialRefreshToken } =
    retrieveTokenFromEncryptedStorage();

  const [accessToken, setAccessToken] = useState(initialAccessToken);
  const [refreshToken, setRefreshToken] = useState(initialRefreshToken);

  // Effect to store tokens in encrypted storage
  useEffect(() => {
    if (accessToken && refreshToken) {
      encryptStorage.setItem('jwtAccessToken', accessToken);
      encryptStorage.setItem('jwtRefreshToken', refreshToken);
    } else {
      encryptStorage.removeItem('jwtAccessToken');
      encryptStorage.removeItem('jwtRefreshToken');
    }
  }, [accessToken, refreshToken]);

  const tokenRefresh = async () => {
    const refreshResponse = await refreshTokenApi(refreshToken);
    setAccessToken(refreshResponse.newAccessToken);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
