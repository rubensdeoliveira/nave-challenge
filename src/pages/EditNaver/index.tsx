import React, { useRef, useCallback, useEffect, useState } from 'react'

import { FaChevronLeft } from 'react-icons/fa'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header'
import {
  Content,
  TitleContainer,
  FormContainer,
  StyledButtonContainer,
} from './styles'
import Button from '../../components/Button'
import Input from '../../components/Input'
import getValidationErrors from '../../utils/getValidationErrors'
import InputMask from '../../components/InputMask'
import api from '../../services/api'
import transformDate from '../../utils/transformDate'

interface INaverInfo {
  name: string
  admission_date: string
  job_role: string
  project: string
  birthdate: string
  url: string
}

interface HistoryStateProps {
  id: string
}

const EditNaver: React.FC = () => {
  const [naver, setNaver] = useState<INaverInfo>({} as INaverInfo)

  const formRef = useRef<FormHandles>(null)

  const history = useHistory()
  const { state } = history.location
  const historyState = state as HistoryStateProps

  useEffect(() => {
    async function loadNaver(): Promise<void> {
      const { data } = await api.get(`navers/${historyState.id}`)

      const formattedNaver = {
        ...data,
        birthdate: transformDate(data.birthdate),
        admission_date: transformDate(data.admission_date),
      }

      formRef.current?.setFieldValue('birthdate', transformDate(data.birthdate))
      formRef.current?.setFieldValue(
        'admission_date',
        transformDate(data.birthdate),
      )

      setNaver(formattedNaver)
    }

    loadNaver()
  }, [historyState.id])

  const handleSubmit = useCallback(
    async (data: INaverInfo) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          job_role: Yup.string().required('Cargo obrigatório'),
          birthdate: Yup.date().required('Idade obrigatória'),
          admission_date: Yup.date().required('Tempo de empresa obrigatório'),
        })

        await schema.isValid(new Date('dd/mm/yyyy'))

        await schema.validate(data, {
          abortEarly: false,
        })

        api.put(`navers/${historyState.id}`, data)

        history.push('/dashboard')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)
        }
      }
    },
    [history, historyState.id],
  )

  return (
    <>
      <Header />

      <Content>
        <TitleContainer>
          <FaChevronLeft size={20} color="#000000" />
          <h1>Editar Naver</h1>
        </TitleContainer>

        <FormContainer>
          <Form ref={formRef} initialData={naver} onSubmit={handleSubmit}>
            <Input name="name" label="Nome" placeholder="Nome" />

            <Input name="job_role" label="Cargo" placeholder="Cargo" />

            <InputMask
              name="birthdate"
              label="Idade"
              placeholder="Idade"
              mask="99/99/9999"
            />

            <InputMask
              name="admission_date"
              label="Tempo de empresa"
              placeholder="Tempo de empresa"
              mask="99/99/9999"
            />

            <Input
              name="project"
              label="Projetos que participou"
              placeholder="Projetos que participou"
            />

            <Input
              name="url"
              label="URL da foto do Naver"
              placeholder="URL da foto do Naver"
            />

            <StyledButtonContainer>
              <Button type="submit">Salvar</Button>
            </StyledButtonContainer>
          </Form>
        </FormContainer>
      </Content>
    </>
  )
}

export default EditNaver
