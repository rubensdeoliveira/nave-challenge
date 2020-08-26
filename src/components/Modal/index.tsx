import React, { useState, useEffect } from 'react'

import ReactModal from 'react-modal'

interface IFoodPlate {
  id: number
  name: string
  image: string
  price: string
  description: string
  available: boolean
}

interface IModalProps {
  children: any
  isOpen: boolean
  maxWidth: string
  setIsOpen: () => void
}

const Modal: React.FC<IModalProps> = ({
  children,
  isOpen,
  maxWidth,
  setIsOpen,
}) => {
  const [modalStatus, setModalStatus] = useState(isOpen)

  useEffect(() => {
    setModalStatus(isOpen)
  }, [isOpen])

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#ffffff',
          color: '#000000',
          borderRadius: '0px',
          width: '85%',
          maxWidth,
          border: 'none',
          padding: 0,
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  )
}

export default Modal
