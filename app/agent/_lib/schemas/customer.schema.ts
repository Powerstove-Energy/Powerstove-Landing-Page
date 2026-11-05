import { z } from 'zod';
import { NIGERIAN_STATES } from '../nigerian-states';

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

/** People in one household age group — must match MAX_HOUSEHOLD_GROUP in the backend. */
const householdGroupSchema = (label: string) =>
  z
    .number({ message: `Enter the number of ${label}` })
    .int(`Enter a whole number of ${label}`)
    .min(0, `Enter the number of ${label}`)
    .max(50, `Enter no more than 50 ${label}`);

const customerFieldsSchema = z.object({
  registration_reference: z.string().uuid(),
  nin: ninSchema.optional().or(z.literal('')),
  bvn: bvnSchema.optional().or(z.literal('')),
  full_name: z.string().min(2, "Enter the customer's full name").max(120),
  phone_number: z.string().regex(/^\+?[0-9]{7,15}$/, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email address').optional().or(z.literal('')),
  address: z.string().trim().min(1, 'Enter the customer address').max(255),
  state: z.enum(NIGERIAN_STATES, { message: "Enter one of Nigeria's 36 states or the FCT" }),
  lga: z.string().trim().min(1, 'Enter the customer LGA').max(100),
  ward: z.string().trim().min(1, 'Enter the customer ward').max(100),
  date_of_birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a valid date of birth')
    .optional()
    .or(z.literal('')),
  gender: z.enum(['male', 'female', 'other']),
  household_children_0_14: householdGroupSchema('children aged 0–14'),
  household_females_15_plus: householdGroupSchema('females aged 15 and over'),
  household_males_15_59: householdGroupSchema('males aged 15–59'),
  household_males_60_plus: householdGroupSchema('males aged 60 and over'),
  stove_model_uuid: z.string().uuid('Select a stove model'),
  // Trimmed but never re-cased: serial numbers are case-sensitive. Empty means the
  // backend gives the stove the next Planethos number.
  serial_number: z
    .string()
    .trim()
    .refine((value) => value === '' || value.length >= 3, 'Serial number must be at least 3 characters')
    .refine((value) => value.length <= 64, 'Serial number must be 64 characters or fewer'),
  customer_photo: claimedAssetSchema,
  id_photo: claimedAssetSchema,
  baseline_stove_photo: claimedAssetSchema,
  gps: z.object({
    latitude: z.number().gte(-90).lte(90),
    longitude: z.number().gte(-180).lte(180),
  }),
  signature: claimedAssetSchema,
  terms_version: z.string().min(1),
});

function hasHouseholdMembers(data: {
  household_children_0_14: number;
  household_females_15_plus: number;
  household_males_15_59: number;
  household_males_60_plus: number;
}): boolean {
  return (
    data.household_children_0_14 +
      data.household_females_15_plus +
      data.household_males_15_59 +
      data.household_males_60_plus >
    0
  );
}

const householdMessage = {
  message: 'Enter at least one household member',
  path: ['household_children_0_14'],
};

/** The step-2 fields, checked before the agent moves on to photos and signature. */
export const customerDetailsSchema = customerFieldsSchema.pick({
  full_name: true,
  phone_number: true,
  email: true,
  address: true,
  state: true,
  lga: true,
  ward: true,
  date_of_birth: true,
  gender: true,
  household_children_0_14: true,
  household_females_15_plus: true,
  household_males_15_59: true,
  household_males_60_plus: true,
  stove_model_uuid: true,
  serial_number: true,
}).refine(hasHouseholdMembers, householdMessage);

export const createCustomerSchema = customerFieldsSchema
  .refine((data) => data.nin || data.bvn, {
    message: 'Provide either a NIN or BVN to verify this customer',
    path: ['nin'],
  })
  .refine(hasHouseholdMembers, householdMessage);
export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
