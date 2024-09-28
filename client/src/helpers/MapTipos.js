function MapTipos(arr, tipo_id) {
  const result = arr.find(a => {
    return a.id === tipo_id
  })
  return result
}

export default MapTipos