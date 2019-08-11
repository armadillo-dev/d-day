export const getItem = (name: string): any => {
  let storedValue = localStorage.getItem(name)
  if (!storedValue) return undefined

  try {
    storedValue = JSON.parse(storedValue)
    return storedValue
  } catch (err) {
    return storedValue
  }
}

export const setItem = (name: string, value: any): void => {
  let storedValue = value

  if (typeof storedValue === 'object') {
    storedValue = JSON.stringify(storedValue)
  }
  localStorage.setItem(name, storedValue)
}
