import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

import type { CreateUserResponseSchema, RegisterSchema } from "@/types.ts";
import { configVars } from "@/config";

export const useRegisterApiHandler = () => {
  const navigate = useNavigate();
  const registerUserRequest = async (
    formData: RegisterSchema,
  ): Promise<CreateUserResponseSchema> => {
    const res = await axios.post(
      `${configVars.VITE_API_BASE_URL}/api/users/register`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (res.status !== 201) {
      throw new Error(res.statusText);
    }

    return res.data;
  };

  const { mutateAsync: createNewUserHandler } = useMutation({
    mutationFn: registerUserRequest,
    onSuccess: () => {
      toast.success("User created successfully.");
      navigate("/");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  return createNewUserHandler;
};
