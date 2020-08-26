import React, { useState, useCallback, useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import { NaversBar, NaversContainer } from './styles'
import Header from '../../components/Header'
import Button from '../../components/Button'
import Navers from '../../components/Navers'
import api from '../../services/api'
import ModalViewNaver from '../../components/ModalViewNaver'

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

  useEffect(() => {
    async function loadNavers(): Promise<void> {
      const response = await api.get('navers')

      setNavers(response.data)
    }

    loadNavers()
  }, [])

  const history = useHistory()

  const handleNavigate = useCallback(() => {
    history.push('/create-naver')
  }, [history])

  const handleDeleteNaver = useCallback(
    async (id: string) => {
      try {
        await api.delete(`navers/${id}`)

        setNavers(navers.filter((naver) => naver.id !== id))
      } catch (err) {
        console.log(err)
      }
    },
    [navers],
  )

  const handleEditNaver = useCallback(
    (id: string) => {
      history.push('/edit-naver', { id })
    },
    [history],
  )

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen)
  }, [modalOpen])

  const handleSelectNaver = useCallback(
    (naver: INaverInfo) => {
      setSelectedNaver(naver)
      toggleModal()
    },
    [toggleModal],
  )

  return (
    <>
      <Header />

      <ModalViewNaver
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        naver={selectedNaver}
        handleDelete={handleDeleteNaver}
        handleEdit={handleEditNaver}
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
              handleDelete={handleDeleteNaver}
              handleEdit={handleEditNaver}
              handleSelect={handleSelectNaver}
            />
          ))}
      </NaversContainer>
    </>
  )
}

export default Home
