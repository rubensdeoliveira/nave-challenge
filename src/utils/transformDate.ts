import { addHours } from 'date-fns'

export default function transformDate(oldDate: Date): string {
  const date = addHours(new Date(oldDate), 3)

  const formattedDate = new Intl.DateTimeFormat('pt-BR').format(date)

  return formattedDate
}
