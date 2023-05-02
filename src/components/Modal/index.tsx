import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from '@phosphor-icons/react'

export type ModalProps = React.ComponentProps<typeof DialogPrimitive.Root> & {}

export function Modal({ children, ...props }: ModalProps) {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Overlay className="bg-black/70 backdrop-blur-md fixed inset-0 z-50" />
      {children}
    </DialogPrimitive.Root>
  )
}

export type ModalWrapperProps = DialogPrimitive.DialogContentProps &
  React.ComponentProps<typeof DialogPrimitive.DialogContent> & {
    buttonCloseModal?: boolean
  }

export function ModalWrapper({
  children,
  buttonCloseModal = true,
  ...props
}: ModalWrapperProps) {
  return (
    <DialogPrimitive.Content
      {...props}
      className="w-4/5 sm:max-w-xl bg-[#202024] border border-[#323238] absolute top-1/2 left-1/2 z-50 rounded-md p-8 -translate-x-1/2 -translate-y-1/2"
    >
      {children}
    </DialogPrimitive.Content>
  )
}

type ModalTitleProps = DialogPrimitive.DialogTitleProps

export function ModalTitle({ children }: ModalTitleProps) {
  return (
    <DialogPrimitive.Title className="font-extrabold text-2xl text-white">
      {children}
    </DialogPrimitive.Title>
  )
}

type ModalButtonCloseProps = DialogPrimitive.DialogCloseProps

export function ModalButtonClose(props: ModalButtonCloseProps) {
  return (
    <DialogPrimitive.Close {...props}>
      <X
        size={20}
        className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200 transition-colors"
        aria-label="Fechar modal"
      />
    </DialogPrimitive.Close>
  )
}

export const ModalTrigger = DialogPrimitive.Trigger
ModalTrigger.displayName = 'ModalTrigger'
