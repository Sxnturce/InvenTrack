import z from "zod"

const pedidoValidateSchemma = z.object({
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

  estado_envio: z.enum(["pendiente", "enviado", "entregado"], {
    invalid_type_error: "El estado ingresado no es correcto.",
    required_error: "Este campo es requerido"
  })
})

export const pedidoValidate = (object) => {
  return pedidoValidateSchemma.safeParse(object)
}

export const partialPedidoValidate = (object) => {
  return pedidoValidateSchemma.partial({ usuario_id: true, producto_id: true, cantidad: true }).safeParse(object)
}