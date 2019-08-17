export const formatDate = (date: Date | string): string => {
  const originDate = typeof date === 'string' ? new Date(date) : date
  const year: number = originDate.getFullYear()
  let month: string = (originDate.getMonth() + 1).toString()
  let day: string = originDate.getDate().toString()

  if (month.length < 2) {
    month = `0${month}`
  }

  if (day.length < 2) {
    day = `0${day}`
  }

  return `${year}-${month}-${day}`
}

export const dateDifference = (fromDate: string | Date, toDate: string | Date): number => {
  const MS_PER_DAY: number = 1000 * 60 * 60 * 24
  const convertedFrom: Date = typeof fromDate === 'string' ? new Date(fromDate) : fromDate
  const convertedTo: Date = typeof toDate === 'string' ? new Date(toDate) : toDate
  const diffTime: number = convertedTo.getTime() - convertedFrom.getTime()

  return Math.ceil(diffTime / MS_PER_DAY)
}
