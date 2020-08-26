import React, { ButtonHTMLAttributes } from 'react'
import { MdClose } from 'react-icons/md'

import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

const CloseButton: React.FC<ButtonProps> = ({ ...rest }) => (
  <Container type="button" {...rest}>
    <MdClose size={14} color="#212121" />
  </Container>
)

export default CloseButton
