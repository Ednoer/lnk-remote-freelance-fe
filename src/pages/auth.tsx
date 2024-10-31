import AuthLayout from '@/components/auth/AuthLayout'
import Input from '@/components/forms/Input'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginData, LoginResponse } from '@/layouts/auth/interface'
import type { NextPage } from 'next'
import { memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import api from '@/layouts/auth/api'
import { Response, ResponseError } from '@/interface/interface'
import utils from '@/helpers/utils'
import sessions from '@/helpers/sessions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const schema = Yup.object({
    email: Yup.string().required('Email is required').email('email is invalid'),
    password: Yup.string().required('Password is required'),
})


const Auth: NextPage = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({ resolver: yupResolver(schema), mode: 'all' })

    const onSuccess = async ({ data }: Response<LoginResponse>) => {
        if (data?.token) {
            const token_ = utils.parseJwt(data.token);
            sessions.setToken(data?.token, token_?.exp)
            toast.success("Login Successfully", {
                autoClose: 2000,
                hideProgressBar: true,
                position: 'top-right'
            });
            router.push('/')
        }
    }

    const onError = (error: ResponseError) => {
        if (error) {
            toast.error(error.message, {
                autoClose: 2000,
                hideProgressBar: true,
                position: 'top-right'
            })
        }
    }

    const { isLoading, mutate } = useMutation(
        (values: LoginData) => api.login(values),
        { onSuccess, onError }
    )

    const onSubmit = (values: LoginData) => {
        mutate(values)
    }

    return (
        <AuthLayout className="flex flex-col items-center justify-center px-4 md:px-0">
            <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-semibold">Sign In</h1>
                    <p className="text-sm">Sign in to access your account</p>
                </div>
                <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-field">
                        <Input
                            register={register}
                            id="email"
                            label="Email"
                            name="email"
                            placeholder="Input Email"
                            type="email"
                            helper
                            infoMsgHelper="Info: Your company email"
                            error={!!errors.email}
                            errorMsg={errors?.email?.message || ''}
                        />
                    </div>
                    <div className="form-field">
                        <Input
                            register={register}
                            id="password"
                            label="Password"
                            name="password"
                            placeholder="Input Password"
                            type="password"
                            error={!!errors.password}
                            errorMsg={errors?.password?.message || ''}
                        />
                    </div>
                    <div className="form-field pt-5">
                        <div className="form-control justify-between">
                            <button
                                type="submit"
                                className={`btn btn-primary w-full ${isLoading && "btn-loading"}`}
                                disabled={isLoading}
                            >Sign in</button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthLayout>
    )
}

export default memo(Auth)