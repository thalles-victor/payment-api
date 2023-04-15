import { z } from "zod";
import { ChardDTO } from "../@types/Charge.dto";

export const ChargeSchema = z.object({
  order: z.object({
    title: z.string().nonempty(),
    price: z.number(),
    installments: z.number().min(1).max(10).nonnegative(),
    card: z.object({
      holder: z.string().nonempty(),
      number: z.string().nonempty().length(19),
      exp_month: z.string().length(2),
      exp_year: z.string().length(4),
      security_code: z.string().length(3),
    }),
  }),
});
