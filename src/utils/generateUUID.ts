const generateUUID = (): string => {
  const generateRandomChars = (): string => Math
    .floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)

  return `${generateRandomChars() + generateRandomChars()}-${generateRandomChars()}-${generateRandomChars()}-${generateRandomChars()}-${generateRandomChars() + generateRandomChars() + generateRandomChars()}`
}

export default generateUUID
