"use client";

import { memo, useState } from "react";
import type { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { User } from "@/entities/User";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Label } from "@/shared/ui/Label/Label";
import { signIn } from "next-auth/react";

interface RegisterFormProps {
  className?: string;
}

export const RegisterForm: FC<RegisterFormProps> = memo(function RegisterForm({
  className = "",
}: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      setLoading(true);
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }
      signIn(undefined, { callbackUrl: "/" });
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
      <h2 className='font-bold text-base text-center'>Регистрация</h2>
      <div className='flex flex-col gap-6'>
        <Input
          type='text'
          title='Имя'
          placeholder='Введите ваше имя'
          {...register("name", { required: true })}
        />
        {errors.name?.type === "required" && (
          <Label>This field is required</Label>
        )}
        <Input
          type='email'
          title='Логин'
          placeholder='Введите ваш email адрес'
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <Label>This field is required</Label>
        )}
        <Input
          type='password'
          className='input-without-arrows'
          title='Пароль'
          placeholder='Введите ваш пароль'
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
        Зарегистрироваться
      </Button>
    </form>
  );
});
