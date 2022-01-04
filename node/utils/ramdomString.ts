export function randomString() {
  var ramdom = '';
  var caracter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (var i = 0; i < 5; i++) {
      ramdom += caracter.charAt(Math.floor(Math.random() * caracter.length));
  }
  return ramdom;
}
