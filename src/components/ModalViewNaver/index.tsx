import React from 'react'

import { MdDelete, MdCreate } from 'react-icons/md'
import Modal from '../Modal'

import {
  Container,
  ImageContainer,
  InfoContainer,
  ActionContainer,
} from './styles'
import CloseButton from '../CloseButton'

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
  setIsOpen: () => void
  handleOpenDeleteModal: (naver: INaverInfo) => void
  handleEdit: (id: string) => void
}

const ModalViewNaver: React.FC<IModalProps> = ({
  isOpen,
  naver,
  setIsOpen,
  handleOpenDeleteModal,
  handleEdit,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth="1000px">
      <Container>
        <CloseButton onClick={setIsOpen} />

        <ImageContainer>
          <img src={naver.url} alt={naver.name} />
        </ImageContainer>

        <InfoContainer>
          <h1>{naver.name}</h1>
          <p>{naver.job_role}</p>
          <h2>Idade</h2>
          <p>{naver.birthdate}</p>
          <h2>Tempo de empresa</h2>
          <p>{naver.admission_date}</p>
          <h2>Projetos que participou</h2>
          <p>{naver.project}</p>

          <ActionContainer>
            <button type="button" onClick={() => handleOpenDeleteModal(naver)}>
              <MdDelete size={18} color="#212121" />
            </button>

            <button type="button" onClick={() => handleEdit(naver.id)}>
              <MdCreate size={18} color="#212121" />
            </button>
          </ActionContainer>
        </InfoContainer>
      </Container>
    </Modal>
  )
}

export default ModalViewNaver
