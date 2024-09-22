import z from "zod"

const ventaValidateSchemma = z.object({
  usuario_id: z.number({
    invalid_type_error: "Este campo solo acepta numeros.",
    required_error: "Este campo es obligatorio."
  }).min(0).int(),

  producto_id: z.number({
    invalid_type_error: "Este campo solo acepta numeros.",
    required_error: "Este campo es obligatorio."
  }).min(0).int(),

  cantidad: z.number({
    invalid_type_error: "Este campo solo acepta numeros.",
    required_error: "Este campo es obligatorio."
  }).min(1).int(),

  total_venta: z.number({
    invalid_type_error: "El precio debe ser un número.",
    required_error: "Este campo es requerido",
  }).positive("El precio debe ser mayor que 0").refine((value) => Number(value.toFixed(2)) === value, {
    message: "El precio debe tener hasta dos decimales.",
  }).optional()
})

export const ventaValidate = (object) => {
  return ventaValidateSchemma.safeParse(object)
}
