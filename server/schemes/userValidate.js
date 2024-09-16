import z from "zod"

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
})

export const userValidate = (object) => {
  return userValidateSchemma.safeParse(object)
}