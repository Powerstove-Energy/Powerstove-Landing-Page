import { z } from 'zod';

export const ninSchema = z.string().regex(/^\d{11}$/, 'NIN must be exactly 11 digits');

export const lookupNinSchema = z.object({
  nin: ninSchema,
});

const bvnSchema = z.string().regex(/^\d{11}$/, 'BVN must be exactly 11 digits');

const claimedAssetSchema = z.object({
  secure_url: z.string().url(),
  public_id: z.string().min(1),
  version: z.number().int().positive(),
});

export const createCustomerSchema = z
  .object({
    registration_reference: z.string().uuid(),
    nin: ninSchema.optional().or(z.literal('')),
    bvn: bvnSchema.optional().or(z.literal('')),
    full_name: z.string().min(2, "Enter the customer's full name").max(120),
    phone_number: z.string().regex(/^\+?[0-9]{7,15}$/, 'Enter a valid phone number'),
    email: z.string().email('Enter a valid email address').optional().or(z.literal('')),
    address: z.string().trim().min(1, 'Enter the customer address').max(255),
    state: z.string().trim().min(1, 'Enter the customer state').max(100),
    lga: z.string().trim().min(1, 'Enter the customer LGA').max(100),
    date_of_birth: z.string().optional().or(z.literal('')),
    gender: z.enum(['male', 'female', 'other']),
    stove_unit_uuid: z.string().uuid('Select a stove unit'),
    customer_photo: claimedAssetSchema,
    stove_photo: claimedAssetSchema,
    gps: z.object({
      latitude: z.number().gte(-90).lte(90),
      longitude: z.number().gte(-180).lte(180),
    }),
    signature: claimedAssetSchema,
    terms_version: z.string().min(1),
  })
  .refine((data) => data.nin || data.bvn, {
    message: 'Provide either a NIN or BVN to verify this customer',
    path: ['nin'],
  });
export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
