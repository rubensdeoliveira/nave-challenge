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

  useEffect(() => {
    async function loadNavers(): Promise<void> {
      const response = await api.get('navers')

      setNavers(response.data)
    }

    loadNavers()
  }, [])

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

        toggleModal()
        toggleModalDelete()
        toggleModalInfo()

        setNavers(navers.filter((naver) => naver.id !== id))
      } catch (err) {
        console.log(err)
      }
    },
    [navers, toggleModal, toggleModalDelete, toggleModalInfo],
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
      />

      <NaversBar>
        <h1>Navers</h1>
        <Button onClick={handleNavigate}>Adicionar Naver</Button>
      </NaversBar>

      <NaversContainer>
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
