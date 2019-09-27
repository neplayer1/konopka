import gql from "graphql-tag";

export type T_ADMIN_LOGIN = {
  adminLogin: {
    password: string;
  }[]
}

export const ADMIN_REGISTER = gql`
  mutation adminRegister($password: String! ) {
    adminRegister(password: $password) {
      password,
    }
  }
`;

export const ADMIN_LOGIN = gql`
  mutation adminLogin($password: String! ) {
    adminLogin(password: $password) {
      password,
    }
  }
`;