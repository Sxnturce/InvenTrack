import { z } from "zod"

const userValidateSchemma = z.object({
  nombre: z.string({
    invalid_type_error: "Este campo solo acepta textos.",
    required_error: "Este campo es obligatorio."
  }).trim().min(5, {
    message: "Como minimo son 5 carácteres."
  }).max(36, {
    message: "Como maximo son 36 caracteres."
  }),

  correo: z.string({
    invalid_type_error: "Este campo solo acepta textos.",
    required_error: "Este campo es obligatorio."
  }).email({
    message: "Ingrese un email valido."
  }),

  pass: z.string({
    invalid_type_error: "Este campo solo acepta textos.",
    required_error: "Este campo es obligatorio."
  }).trim().min(5, {
    message: "Como minimo son 5 carácteres."
  }).max(36, {
    message: "Como maximo son 36 caracteres."
  }),

  ventas_totales: z.number({
    invalid_type_error: "El precio debe ser un número.",
    required_error: "Este campo es requerido",
  }).positive("El precio debe ser mayor que 0").refine((value) => Number(value.toFixed(2)) === value, {
    message: "El precio debe tener hasta dos decimales.",
  }).optional()
})

export function userValidate(obj) {
  return userValidateSchemma.safeParse(obj)
}

export const userValidatePartial = (object) => {
  return userValidateSchemma.partial({ nombre: true }).safeParse(object)
}

export const passValidatePartial = (object) => {
  return userValidateSchemma.partial({ nombre: true, correo: true }).safeParse(object)
}