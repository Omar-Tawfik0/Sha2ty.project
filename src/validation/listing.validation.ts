// Omar Mohamed
import { z } from 'zod';

export const createListingSchema = z.object({
  location: z.string().min(1, 'Location is required'),
  price: z.number().positive('Price must be a positive number'), 
  roomsAvailable: z.number().int().positive('Rooms available must be a positive integer'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
});

export const updateListingSchema = createListingSchema.partial();

// Mohamed Atef
export const filterListingSchema = z.object({
  location: z.string().optional(),
  minPrice: z.coerce.number().positive('minPrice must be a positive number').optional(),
  maxPrice: z.coerce.number().positive('maxPrice must be a positive number').optional(),
  roomsAvailable: z.coerce.number().int().positive('roomsAvailable must be a positive integer').optional(),
  isAvailable: z.enum(['true', 'false']).transform((val) => val === 'true').optional(),
});