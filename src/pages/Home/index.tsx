import React, { useState, useCallback, useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import { NaversBar, NaversContainer } from './styles'
import Header from '../../components/Header'
import Button from '../../components/Button'
import Navers from '../../components/Navers'
import api from '../../services/api'
import ModalViewNaver from '../../components/ModalViewNaver'
import ModalDeleteNaver from '../../components/ModalDeleteNaver'
import ModalInfo from '../../components/ModalInfo'
import { useToast } from '../../hooks/toast'

interface INaverInfo {
  id: string
  name: string
  admission_date: string
  job_role: string
  project: string
  birthdate: string
  url: string
}

const Home: React.FC = () => {
  const [navers, setNavers] = useState<INaverInfo[]>([])
  const [selectedNaver, setSelectedNaver] = useState<INaverInfo>(
    {} as INaverInfo,
  )
  const [modalOpen, setModalOpen] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
  const [modalInfoOpen, setModalInfoOpen] = useState(false)

  const { addToast } = useToast()

  const loadNavers = useCallback(async () => {
    const response = await api.get('navers')

    setNavers(response.data)
  }, [])

  useEffect(() => {
    loadNavers()
  }, [loadNavers])

  const history = useHistory()

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen)
  }, [modalOpen])

  const toggleModalDelete = useCallback(() => {
    setModalDeleteOpen(!modalDeleteOpen)
  }, [modalDeleteOpen])

  const toggleModalInfo = useCallback(() => {
    setModalInfoOpen(!modalInfoOpen)
  }, [modalInfoOpen])

  const handleNavigate = useCallback(() => {
    history.push('/create-naver')
  }, [history])

  const handleDeleteNaver = useCallback(
    async (id: string) => {
      try {
        await api.delete(`navers/${id}`)

        modalOpen && toggleModal()
        modalDeleteOpen && toggleModalDelete()
        toggleModalInfo()

        setNavers(navers.filter((naver) => naver.id !== id))
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao excluir o naver',
          description: 'Tente novamente mais tarde.',
        })
      }
    },
    [
      navers,
      toggleModal,
      toggleModalDelete,
      toggleModalInfo,
      addToast,
      modalOpen,
      modalDeleteOpen,
    ],
  )

  const handleEditNaver = useCallback(
    (id: string) => {
      history.push('/edit-naver', { id })
    },
    [history],
  )

  const handleViewNaver = useCallback(
    (naver: INaverInfo) => {
      setSelectedNaver(naver)
      toggleModal()
    },
    [toggleModal],
  )

  const handleOpenDeleteModal = useCallback(
    (naver: INaverInfo) => {
      setSelectedNaver(naver)
      toggleModalDelete()
    },
    [toggleModalDelete],
  )

  return (
    <>
      <Header />

      <ModalViewNaver
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        naver={selectedNaver}
        handleOpenDeleteModal={handleOpenDeleteModal}
        handleEdit={handleEditNaver}
        data-testid="modal"
      />

      <ModalDeleteNaver
        isOpen={modalDeleteOpen}
        setIsOpen={toggleModalDelete}
        naver={selectedNaver}
        handleDelete={handleDeleteNaver}
      />

      <ModalInfo
        isOpen={modalInfoOpen}
        setIsOpen={toggleModalInfo}
        title="Naver excluído"
        message="Naver excluído com sucesso!"
        data-testid="modal-info"
      />

      <NaversBar>
        <h1>Navers</h1>
        <Button onClick={handleNavigate}>Adicionar Naver</Button>
      </NaversBar>

      <NaversContainer data-testid="navers-list">
        {navers &&
          navers.map((naver) => (
            <Navers
              key={naver.id}
              naver={naver}
              handleOpenDeleteModal={handleOpenDeleteModal}
              handleEdit={handleEditNaver}
              handleView={handleViewNaver}
            />
          ))}
      </NaversContainer>
    </>
  )
}

export default Home
