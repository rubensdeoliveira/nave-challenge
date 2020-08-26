import React from 'react'

import Modal from '../Modal'
import { CancelButton, Container, ActionContainer } from './styles'
import Button from '../Button'
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
  handleDelete: (id: string) => void
}

const ModalDeleteNaver: React.FC<IModalProps> = ({
  isOpen,
  naver,
  setIsOpen,
  handleDelete,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth="592px">
      <Container>
        <CloseButton onClick={setIsOpen} />

        <h1>Excluir Naver</h1>
        <p>Tem certeza que deseja excluir este Naver?</p>

        <ActionContainer>
          <CancelButton type="button" onClick={setIsOpen}>
            Cancelar
          </CancelButton>

          <Button type="button" onClick={() => handleDelete(naver.id)}>
            Excluir
          </Button>
        </ActionContainer>
      </Container>
    </Modal>
  )
}

export default ModalDeleteNaver
