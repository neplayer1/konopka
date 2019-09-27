import {useContextStrict} from 'hooks/useContextStrict';
import {AuthContext} from "context/ctxAuth";

export const useAuth = () => {
  const { autorized, setAutorized } = useContextStrict(AuthContext);

  return { autorized, setAutorized };
}