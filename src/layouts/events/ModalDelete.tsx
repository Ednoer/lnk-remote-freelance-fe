
import { FC, memo } from "react";
import IconClose from '@assets/icons/admin/icon-close.svg'
import { Modal } from "@/components";

interface ModalDeleteProps {
    isOpen: boolean
    closeModal: () => void
    onOk: () => void
}

const ModalDelete: FC<ModalDeleteProps> = ({
    isOpen,
    closeModal,
    onOk,
}) => {
    return (
        <Modal isOpen={isOpen} size="xs" closeModal={closeModal} noPadding>
            <div className="p-2 font-base flex flex-col gap-2">
                <div className="cursor-pointer flex flex-row items-end justify-end" role="button" onClick={closeModal}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </div>
                <div className="text-md font-bold">
                    Are you sure you want to delete this event?
                </div>
                <div className="text-xs">
                    You will not be able to see this event again if you delete it.
                </div>
                <div className="flex flex-row items-end justify-end gap-2 mt-4 h-[44px]">
                    <div>
                        <button
                            className={`btn w-full`}
                            onClick={closeModal} >Cancel</button>
                    </div>
                    <div>
                        <button
                            className={`btn bg-red-500 text-white w-full`}
                            onClick={onOk}>Yes, Sure!</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default memo(ModalDelete);