import { z } from 'zod';

export const assignStoveSchema = z.object({
  stove_unit_uuid: z.string().uuid('Select a stove unit'),
});
export type AssignStoveInput = z.infer<typeof assignStoveSchema>;
