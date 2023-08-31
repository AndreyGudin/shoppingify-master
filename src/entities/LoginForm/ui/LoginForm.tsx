"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { memo, useState } from "react";
import type { FC } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Label } from "@/shared/ui/Label/Label";
import { User } from "@/entities/User";
import { signIn } from "next-auth/react";

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FC<LoginFormProps> = memo(function LoginForm({
  className = "",
}: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl,
      });
      setLoading(false);
      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("invalid email or password");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  return (
    <form
      className={`${className} w-[409px] min-h-[382px] flex flex-col gap-8 bg-white rounded-2xl justify-center p-8`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className='font-bold text-base text-center'>Simple Hotel Check</h2>
      <div className='flex flex-col gap-6'>
        <Input
          type='email'
          title='Логин'
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <Label>This field is required</Label>
        )}
        <Input
          type='password'
          className='input-without-arrows'
          title='Пароль'
          {...register("password", {
            required: true,
            minLength: 8,
          })}
        />
        {errors.password?.type === "required" && (
          <Label>This field is required</Label>
        )}
        {errors.password?.type === "minLength" && (
          <Label>Password must be more than 8 digits</Label>
        )}
      </div>
      <Button disabled={loading} loading={loading} type='submit'>
        Войти
      </Button>
    </form>
  );
});
