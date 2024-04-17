import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { authLogin, authLogout } from "../services/apis";

export function useAuthLogin() {

  const navigate = useNavigate()
  const { setUser, setToken } = useAuth();
  return useMutation({
    mutationFn: authLogin,
    onSuccess: (data) => {
      setUser(data.data)
      setToken(data.token)
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast.success("Login Successful", { transition: Flip });
      navigate("/dashboard")
    },
    onError: (error) => {

      toast.error(error.response.data.message, { transition: Flip })
      navigate("/login")
    }
  })
}

export function useAuthLogout() {
  const navigate = useNavigate()
  const { setUser, setToken } = useAuth();
  return useMutation({
    mutationFn: authLogout,
    onMutate: () => {
      toast.info("Logout Successful", { transition: Flip });
    },
    onSuccess: () => {
      setUser({});
      setToken(null);
      navigate("/login")
    },
    onError: (err) => {
      toast.error(err.response.data.message, { transition: Flip })
    }
  })
}