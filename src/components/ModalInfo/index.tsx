import React from 'react'

import { MdDelete, MdCreate } from 'react-icons/md'
import Modal from '../Modal'

import {
  Container,
  ImageContainer,
  InfoContainer,
  ActionContainer,
} from './styles'

interface INaverInfo {
  id: string
  name: string
  admission_date: string
  job_role: string
  project: string
  birthdate: string
  url: string
}

interface IModalProps {
  isOpen: boolean
  naver: INaverInfo
  title: string
  message: string
  setIsOpen: () => void
}

const ModalInfo: React.FC<IModalProps> = ({
  isOpen,
  naver,
  title,
  message,
  setIsOpen,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth="1000px">
      <Container>
        <h1>{title}</h1>
        <p>{message}</p>
      </Container>
    </Modal>
  )
}

export default ModalInfo
