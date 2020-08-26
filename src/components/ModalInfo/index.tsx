import React from 'react'

import Modal from '../Modal'

import { Container } from './styles'
import CloseButton from '../CloseButton'

interface IModalProps {
  isOpen: boolean
  title: string
  message: string
  setIsOpen: () => void
}

const ModalInfo: React.FC<IModalProps> = ({
  isOpen,
  title,
  message,
  setIsOpen,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth="592px">
      <Container>
        <CloseButton onClick={setIsOpen} />

        <h1>{title}</h1>
        <p>{message}</p>
      </Container>
    </Modal>
  )
}

export default ModalInfo
