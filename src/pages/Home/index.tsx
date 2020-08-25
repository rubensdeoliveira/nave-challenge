import React, { useState } from 'react'

import { NaversBar, NaversContainer } from './styles'
import Header from '../../components/Header'
import Button from '../../components/Button'
import Navers from '../../components/Navers'

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

  return (
    <>
      <Header />

      <NaversBar>
        <h1>Navers</h1>
        <Button>Adicionar Naver</Button>
      </NaversBar>

      <NaversContainer>
        <Navers />
        <Navers />
        <Navers />
        <Navers />
      </NaversContainer>
    </>
  )
}

export default Home
