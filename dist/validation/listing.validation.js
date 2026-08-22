"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterListingSchema = exports.updateListingSchema = exports.createListingSchema = void 0;
// Omar Mohamed
const zod_1 = require("zod");
exports.createListingSchema = zod_1.z.object({
    location: zod_1.z.string().min(1, 'Location is required'),
    price: zod_1.z.number().positive('Price must be a positive number'),
    roomsAvailable: zod_1.z.number().int().positive('Rooms available must be a positive integer'),
    description: zod_1.z.string().min(10, 'Description must be at least 10 characters long'),
});
exports.updateListingSchema = exports.createListingSchema.partial();
// Mohamed Atef
exports.filterListingSchema = zod_1.z.object({
    location: zod_1.z.string().optional(),
    minPrice: zod_1.z.coerce.number().positive('minPrice must be a positive number').optional(),
    maxPrice: zod_1.z.coerce.number().positive('maxPrice must be a positive number').optional(),
    roomsAvailable: zod_1.z.coerce.number().int().positive('roomsAvailable must be a positive integer').optional(),
    isAvailable: zod_1.z.enum(['true', 'false']).transform((val) => val === 'true').optional(),
});
//# sourceMappingURL=listing.validation.js.map