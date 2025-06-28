import { Dispatch, SetStateAction } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

type Props = {
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
    title: string;
    children: ReactNode;
    width?: string;
}

export default function ModalRadixUI({ modal, setModal, title, children, width }: Props) {
    return (
        <Dialog.Root open={modal}>
            <Dialog.Portal>
                <Dialog.Overlay className={`fixed inset-0 bg-black/50 ${modal ? 'animate-fadeIn' : 'animate-fadeOut'} z-[300]`}
                    onClick={() => setModal(false)}
                />

                <Dialog.Content className={`${width} fixed top-1/2 left-1/2 bg-white rounded-md shadow-lg translate-x-[-50%] translate-y-[-50%] z-[300]  data-[state=open]:animate-slideIn data-[state=closed]:animate-slideOut`}
                >
                    <Dialog.Title className="text-lg font-bold mb-4">
                        <div className="flex justify-between items-center bg-green-600 px-6 py-4 text-white">
                            <h3 className="text-xl font-bold uppercase">
                                {title}
                            </h3>
                            <button
                                className="text-white hover:text-gray-300"
                                onClick={() => setModal(false)}
                            >
                                ✕
                            </button>
                        </div>
                    </Dialog.Title>
                    <Dialog.Description className="mb-4">
                        <></>
                    </Dialog.Description>
                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
