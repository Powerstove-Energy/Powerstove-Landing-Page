import { z } from 'zod';

export const ninSchema = z.string().regex(/^\d{11}$/, 'NIN must be exactly 11 digits');

export const lookupNinSchema = z.object({
  nin: ninSchema,
});

export const createCustomerSchema = z.object({
  nin: ninSchema,
  full_name: z.string().min(2, "Enter the customer's full name").max(120),
  phone_number: z.string().regex(/^\+?[0-9]{7,15}$/, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email address').optional().or(z.literal('')),
  address: z.string().max(255).optional().or(z.literal('')),
  state: z.string().max(100).optional().or(z.literal('')),
  lga: z.string().max(100).optional().or(z.literal('')),
  date_of_birth: z.string().optional().or(z.literal('')),
  gender: z.enum(['male', 'female', 'other']).optional().or(z.literal('')),
});
export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
