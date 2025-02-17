import { z } from "zod";

const signUpSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "올바른 이메일 형식이 아닙니다." }),
  nickname: z.string().min(1, { message: "닉네임을 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." }),
  passwordConfirmation: z
    .string()
    .min(8, { message: "비밀번호 확인은 최소 8자 이상이어야 합니다." }),
});

const logInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." }),
});

export const useSignUpValidataion = () => {
  const validate = (name, val, userData) => {
    const parsed = signUpSchema.safeParse({ ...userData, [name]: val });
    if (!parsed.success) {
      const error = parsed.error.format();
      const errorMessage = error[name]?._errors[0] || "";
      return errorMessage;
    }
    return "";
  };

  const validateForm = (userData) => {
    const parsedData = signUpSchema.safeParse(userData);
    return parsedData.success;
  };

  return { validate, validateForm };
};

export const useLogInValidataion = () => {
  const validate = (name, val, userData) => {
    const parsed = logInSchema.safeParse({ ...userData, [name]: val });
    if (!parsed.success) {
      const error = parsed.error.format();
      const errorMessage = error[name]?._errors[0] || "";
      return errorMessage;
    }
    return "";
  };

  const validateForm = (userData) => {
    const parsedData = logInSchema.safeParse(userData);
    return parsedData.success;
  };

  return { validate, validateForm };
};
