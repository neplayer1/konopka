import React, {FC, useCallback, useState} from 'react';
import {FormInput} from "components/FormInput/FormInput";
import {useMutation} from "@apollo/react-hooks";
import {ADMIN_LOGIN} from "queries/admin";
import {routes} from "utils/routes";
import {History} from "history";
import {useAuth} from "hooks/useAuth";

type TProps = {
  history: History
}

export const AdminLoginPage: FC<TProps> = ({history}) => {
  const [passError, setPassError] = useState(false);
  const {setAutorized} = useAuth();
  // const [adminRegister] = useMutation(ADMIN_REGISTER);
  const [adminLogin] = useMutation(ADMIN_LOGIN, {
    onCompleted: ({adminLogin}) => {
      if (adminLogin === null) {
        setPassError(true);
        setTimeout(() => {
          setPassError(false);
        }, 500)
      } else {
        setAutorized(true);
        history.push(routes.adminDashboard());
      }
    }
  });

  const handleSubmit = useCallback((e) => {
    if (e.charCode === 13 || e.keyCode === 13) {
      adminLogin({
        variables: {
          password: e.target.value,
        }
      });
      e.target.value = '';
    }
  }, [adminLogin]);

  return (
    <div className="admin-page">
      <div className="form__center">
        <FormInput name="password" type='password' onKeyPress={e => handleSubmit(e)} onSubmit={e => handleSubmit(e)} placeholder='Пароль' animationError={passError}/>
      </div>
    </div>
  );
}