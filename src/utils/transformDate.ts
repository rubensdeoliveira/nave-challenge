import { addHours } from 'date-fns'

export function convertToLocalDate(oldDate: string): string {
  const date = addHours(new Date(oldDate), 3)

  const formattedDate = date.toLocaleDateString('pt-BR')

  return formattedDate
}

export function convertToGlobalDate(oldDate: string): string {
  const dataSplited = oldDate.split('/')

  return `${dataSplited[1]}/${dataSplited[0]}/${dataSplited[2]}`
}
