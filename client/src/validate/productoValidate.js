import { z } from "zod"

const productValidateSchemma = z.object({
  nombre: z.string({
    invalid_type_error: "Este campo solo acepta textos.",
    required_error: "Este campo es obligatorio."
  }).min(5, {
    message: "Como minimo son 5 carácteres."
  }).max(36, {
    message: "Como maximo son 36 caracteres."
  }),

  tipo_id: z.number({
    invalid_type_error: "Este campo solo acepta numeros.",
    required_error: "Este campo es obligatorio."
  }).min(1).int(),

  cantidad: z.number({
    invalid_type_error: "Este campo solo acepta numeros.",
    required_error: "Este campo es obligatorio."
  }).min(1, {
    message: "El número debe ser mayor o igual a 1."
  }).int(),

  precio: z.number({
    invalid_type_error: "El precio debe ser un número.",
    required_error: "Este campo es requerido",
  }).positive("El precio debe ser mayor que 0").refine((value) => Number(value.toFixed(2)) === value, {
    message: "El precio debe tener hasta dos decimales.",
  }),

  estado_stock: z.enum(["bajo", "adecuado", "suficiente"], {
    invalid_type_error: "El estado ingresado no es correcto.",
    required_error: "Este campo es requerido"
  })
})

export const productValidate = (object) => {
  return productValidateSchemma.safeParse(object)
}