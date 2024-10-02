import { z } from "zod"

const userValidateSchemma = z.object({
  nombre: z.string({
    invalid_type_error: "Este campo solo acepta textos.",
    required_error: "Este campo es obligatorio."
  }).min(5, {
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
  }).min(5, {
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

const tokenPassSchemma = z.object({
  token_pass: z.number({
    invalid_type_error: "Este campo solo acepta numeros.",
    required_error: "Este campo es obligatorio."
  }).int().min(100000).max(999999),
  correo: z.string({
    invalid_type_error: "Este campo solo acepta textos.",
    required_error: "Este campo es obligatorio."
  }).email({
    message: "Ingrese un email valido."
  })
})

export const emailPassValidate = (object) => {
  return tokenPassSchemma.partial({ token_pass: true }).safeParse(object)
}

export const tokenPassValidate = (object) => {
  return tokenPassSchemma.partial({ correo: true }).safeParse(object)
}

export const userValidate = (object) => {
  return userValidateSchemma.safeParse(object)
}

export const userValidatePartial = (object) => {
  return userValidateSchemma.partial({ nombre: true }).safeParse(object)
}

export const passValidatePartial = (object) => {
  return userValidateSchemma.partial({ nombre: true, correo: true }).safeParse(object)
}