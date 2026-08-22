"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRequestStatusSchema = exports.createInterestRequestSchema = void 0;
const zod_1 = require("zod");
exports.createInterestRequestSchema = zod_1.z.object({
    listingId: zod_1.z.string().min(1, 'Listing ID is required'),
});
exports.updateRequestStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(['accepted', 'declined'], {
        message: 'Status must be either accepted or declined',
    }),
});
//# sourceMappingURL=request.validation.js.map