import { Dialog, Transition } from '@headlessui/react'
import { FC, Fragment } from 'react'

const sizes = {
  xs: 'max-w-screen-xs',
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
}
interface ModalProps {
  title?: string | React.ReactNode
  closeModal: () => void
  isOpen: boolean
  children: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg'
  noPadding?: boolean
}

const Modal: FC<ModalProps> = ({
  isOpen = false,
  closeModal,
  children,
  title,
  size = 'sm',
  noPadding = false,
}) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div
              className={`flex min-h-full items-center justify-center ${
                noPadding ? 'p-0' : 'p-4'
              } text-center`}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`${
                    sizes[size]
                  }  transform overflow rounded-lg bg-white ${
                    noPadding ? 'p-2' : 'p-6'
                  } text-left align-middle shadow-xl transition-all`}
                >
                  <Dialog.Title
                    as="h3"
                    className={`text-lg font-medium leading-6 text-gray-900 flex justify-between items-center ${
                      noPadding ? 'absolute top-8 right-8' : 'block'
                    }`}
                  >
                    <span>{title}</span>
                  </Dialog.Title>
                  <div className={`${noPadding ? 'm-0 p-0' : 'mt-3'}`}>
                    {children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal
