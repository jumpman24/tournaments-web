import { createContext, PropsWithChildren, useCallback } from "react";

export const AuthContext = createContext({
  token: "",
  login(token: string, remember: boolean) {},
  logout() {},
});

type Props = {
  token: string;
  setToken: (token: string) => {};
};
const AuthContextProvider = (props: PropsWithChildren<Props>) => {
  const { token, setToken } = props;

  const loginHandler = useCallback(
    (token: string, remember: boolean) => {
      setToken(token);
      if (remember) {
        localStorage.setItem("access_token", token);
      }
    },
    [setToken]
  );
  const logoutHandler = useCallback(() => {
    setToken("");
    localStorage.removeItem("access_token");
  }, [setToken]);

  return (
    <AuthContext.Provider
      value={{
        token: token,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
