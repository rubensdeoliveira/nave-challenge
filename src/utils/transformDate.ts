import { addHours } from 'date-fns'

export function convertToString(oldDate: Date): string {
  const date = addHours(new Date(oldDate), 3)

  const formattedDate = new Intl.DateTimeFormat('pt-BR').format(date)

  return formattedDate
}

export function convertToGlobalDate(oldDate: string): string {
  const dataSplited = oldDate.split('/')

  return `${dataSplited[1]}/${dataSplited[0]}/${dataSplited[2]}`
}
