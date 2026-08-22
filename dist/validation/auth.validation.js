"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2, 'Full Name is required and must be at least 2 characters'),
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z
        .string()
        .min(6, 'Password must be at least 6 characters long'),
    role: zod_1.z.enum(['Lister', 'Seeker'], {
        message: 'Role must be either Lister or Seeker',
    }),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
//# sourceMappingURL=auth.validation.js.map