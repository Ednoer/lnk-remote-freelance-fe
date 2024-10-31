import Input from "@/components/forms/Input";
import { FC, memo, useEffect, useState } from "react";
import * as Yup from 'yup'
import { UpsertEvent } from "./interface";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Response, ResponseError } from '@/interface/interface'
import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";
import api from "./api";
import { useRouter } from "next/router";
import TextArea from "@/components/forms/TextArea";
import dayjs from "dayjs";
import ModalDelete from "./ModalDelete";

interface IUpsertEvent {
    isEdit?: boolean
}

const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    date: Yup.string().required('Date is required'),
    description: Yup.string().required('Description is required'),
});


const UpsertEventPage: FC<IUpsertEvent> = ({ isEdit }) => {
    const router = useRouter()
    const { id } = router.query;
    const [isOpenModalConfirm, setIsOpenModalConfirm] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        getValues
    } = useForm<UpsertEvent>({ resolver: yupResolver(schema), mode: 'all' })

    const onSuccess = async ({ data }: Response<any>) => {
        toast.success(`${isEdit ? 'Edit' : 'Add'} Successfully`, {
            autoClose: 2000,
            hideProgressBar: true,
            position: 'top-right'
        });

        router.push('/')
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
        (values: UpsertEvent) => api.addEvent(values),
        { onSuccess, onError }
    )

    const { isLoading: isLoadingEdit, mutate: mutateEdit } = useMutation(
        (values: UpsertEvent) => api.updateEvent(id, values),
        { onSuccess, onError }
    )

    const handleCancel = (e: any) => {
        e.preventDefault()
        router.push('/')
    }

    const {
        data, isFetching
    } = useQuery(['get-event', id], () => api.getEvent(id), {
        enabled: !!id
    })

    useEffect(() => {
        if (data && data.data) {
            const data_ = data.data
            setValue('date', dayjs(data_.date).format("YYYY-MM-DD"))
            setValue('description', data_.description)
            setValue('email', data_.email)
        }
    }, [data])

    const handleButtonSubmit = (e: any) => {
        e.preventDefault()
        if (isEdit) {
            mutateEdit(getValues())
        } else {
            mutate(getValues())
        }
    }

    const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(
        (values: any) => api.deleteEvent(id),
        {
            onSuccess: async ({ data }: Response<any>) => {
                toast.success(`Delete Successfully`, {
                    autoClose: 2000,
                    hideProgressBar: true,
                    position: 'top-right'
                });

                router.push('/')
            }, onError
        }
    )

    const handleDeleteEvent = (data: any) => {
        mutateDelete(data)
    }

    return (
        <div className="mt-5 flex flex-col gap-2">
            <div className="flex flex-col md:flex-row items-center justify-between bg-white self-stretch box-border overflow-hidden rounded-md p-4 hover:shadow gap-4 md:gap-0 mt-2">
                <div className="font-semibold text-lg text-center md:text-left">
                    {isEdit ? "Edit" : "Add"} Event
                    <div className="font-normal text-base">
                        Event Form
                    </div>
                </div>
            </div>
            <form className="form-group flex flex-col items-center justify-between bg-white self-stretch box-border overflow-hidden rounded-md p-4 hover:shadow gap-4 md:gap-2">
                <div className="flex flex-col md:flex-row gap-2 w-full">
                    <div className="form-field flex-1 w-full">
                        <Input
                            id="email"
                            label="Email"
                            name="email"
                            placeholder="Input Email"
                            type="text"
                            register={register}
                            error={!!errors.email}
                            errorMsg={errors?.email?.message || ''}
                        />
                    </div>
                    <div className="form-field flex-1 w-full">
                        <Input
                            id="date"
                            label="Date"
                            name="date"
                            placeholder="Input Date"
                            type="date"
                            register={register}
                            error={!!errors.date}
                            errorMsg={errors?.date?.message || ''}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 w-full">
                    <div className="form-field flex-1 w-full">
                        <TextArea
                            id="description"
                            label="Description"
                            name="description"
                            placeholder="Input description"
                            type="textarea"
                            register={register}
                            error={!!errors.description}
                            errorMsg={errors?.description?.message || ''}
                            rows={8}
                        />
                    </div>
                </div>
                <div className="flex flex-row w-full justify-end gap-2">
                    <div>
                        <button
                            className={`btn w-full`}
                            onClick={(e) => handleCancel(e)}
                        >Cancel</button>
                    </div>
                    {
                        !!id &&
                        <div>
                            <button
                                className={`btn bg-red-500 w-full text-white ${(isLoading || isLoadingEdit || isLoadingDelete) && "btn-loading"}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsOpenModalConfirm(!isOpenModalConfirm)
                                }}
                                disabled={isLoading || isLoadingEdit || isLoadingDelete}
                            >Delete</button>
                        </div>
                    }
                    <div>
                        <button
                            type="submit"
                            className={`btn btn-primary ${(isLoading || isLoadingEdit) && "btn-loading"}`}
                            onClick={(e) => handleButtonSubmit(e)}
                            disabled={isLoading || isLoadingEdit}
                        >Submit</button>
                    </div>
                </div>
            </form>

            <ModalDelete
                isOpen={isOpenModalConfirm}
                closeModal={() => setIsOpenModalConfirm(!isOpenModalConfirm)}
                onOk={() => handleDeleteEvent(id)} />
        </div>
    )
}




export default memo(UpsertEventPage)