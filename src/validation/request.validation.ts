import { z } from 'zod';

export const createInterestRequestSchema = z.object({
  listingId: z.string().min(1, 'Listing ID is required'),
});

export const updateRequestStatusSchema = z.object({
  status: z.enum(['accepted', 'declined'], {
    message: 'Status must be either accepted or declined',
  }),
});