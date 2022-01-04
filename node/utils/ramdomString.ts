export function randomString() {
  let ramdom = ''
  const caracter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  for (let i = 0; i < 5; i++) {
    ramdom += caracter.charAt(Math.floor(Math.random() * caracter.length))
  }

  return ramdom
}
