function ParseDate(fecha) {
  const date = new Date(fecha)
  const options = {
    year: 'numeric',
    month: 'long', // Usa 'numeric' para mes como número
    day: 'numeric'
  };
  const formated = date.toLocaleString("es-Es", options)
  return formated
}

export default ParseDate