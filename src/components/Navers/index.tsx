import React from 'react'
import { MdDelete, MdCreate } from 'react-icons/md'
import { Container, ActionContainer } from './styles'

const Navers: React.FC = () => (
  <Container>
    <img
      src="https://www.areavip.com.br/wp-content/uploads/2019/10/juliano.jpg"
      alt="Juliano"
    />
    <h2>Juliano Reis</h2>
    <p>Front-end Developer</p>
    <ActionContainer>
      <MdDelete size={18} color="#212121" />
      <MdCreate size={18} color="#212121" />
    </ActionContainer>
  </Container>
)

export default Navers
