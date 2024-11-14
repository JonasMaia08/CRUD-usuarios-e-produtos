import { z } from "zod";

export const userProductSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, { message: "O campo nome precisa ser preenchido" }),
 
  descricao: z.string(),


  quantidade: z
    .number()
    .min(1, { message: "Quantidade deve ser pelo menos 1" })
    .int({ message: "Quantidade deve ser um número inteiro" }),

  categoria: z.string(),

  preco: z
  .string()
  .transform((val) => parseFloat(val)) 
  .refine((val) => !isNaN(val) && val > 0, { message: "Introduza um valor válido" }),

});

export type userProduct = z.infer<typeof userProductSchema>;
