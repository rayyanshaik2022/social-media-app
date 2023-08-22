import { useState, useEffect } from 'react';
import { getAuthenticatedUser } from './common';
import { useNavigate } from 'react-router-dom';

export function useUser(page="/home") {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserDetails() {
      const { authenticated, user } = await getAuthenticatedUser();
      if (!authenticated) {
        navigate("/sign-in/");
        return;
      }
      setUser(user);
      setAuthenticated(authenticated);
      navigate(page);
    }
    getUserDetails();
  }, []);

  return { user, authenticated };
}