import z from "zod"

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
