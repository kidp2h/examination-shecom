import { z } from 'zod';
export const paymentFormSchema = z.object({
  firstName: z.string().min(1, {
    message: 'không được để trống',
  }),
  lastName: z.string().min(1, {
    message: 'không được để trống',
  }),
  email: z.string().email({
    message: 'không hợp lệ',
  }),
  phone: z.preprocess(
    Number,
    z.number({
      message: 'không hợp lệ',
    }),
    {
      message: 'không hợp lệ',
    },
  ),
});
