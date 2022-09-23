import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { errorActions } from "../store/errorSlice";

export const DOMAIN = "http://localhost:3000/api/v1";
export const LOGIN_URL = `${DOMAIN}/users/login`;
export const SIGNUP_URL = `${DOMAIN}/users/signup`;
export const ITEM_CRUD = `${DOMAIN}/items`;

const useHttp = () => {
  const dispatch = useDispatch();

  const sendRequest = useCallback(
    async (requestConfig) => {
      dispatch(errorActions.removeError());
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method || "GET",
          body: JSON.stringify(requestConfig.body) || null,
          headers: requestConfig.headers || {},
        });

        const data = await response.json();

        if (!response.ok)
          throw new Error(data.message || "Request failed. Try again later");

        if (response.status === 204) return;

        return data;
      } catch (err) {
        dispatch(errorActions.setError(err.message));
      }
    },
    [dispatch]
  );

  return {
    sendRequest,
  };
};

export default useHttp;
