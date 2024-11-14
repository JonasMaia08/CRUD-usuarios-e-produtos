import { z } from "zod";

export const userRegisterSchema = z.object({
  
  id: z.number().optional(), 
  
  nome: z.string().min(1, { message: "O campo nome precisa ser preenchido" }),
  

  email: z
    .string()
    .min(1, {
      message: "O campo email  precisa ser preenchido",
    })
    .email({
      message: "Email Inválido",
    }),


  telefone: z
    .string()
    .min(1, {
      message: "O campo telefone  precisa ser preenchido",
    })
    .regex(/^\(\d{2}\)\s?\d{5}-\d{4}$/, {
      message: "Telefone Inválido",
    }),
   
    data_nascimento: z
    .string()
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/,
      "Data inválida"
    )
    .min(1, "O campo data de nascimento precisa ser preenchido")
    .refine((val) => {
      // Convert dd/mm/yyyy to yyyy/mm/dd
      const [day, month, year] = val.split('/');
      return `${year}/${month}/${day}`;  // Convert and return in yyyy/mm/dd format
    }, {
      message: "Data inválida",
    })
    .transform((val) => {
      const [day, month, year] = val.split('/');
      return `${year}-${month}-${day}`; // Format it as yyyy-mm-dd
    }),

})

export type userRegister = z.infer<typeof userRegisterSchema>;
