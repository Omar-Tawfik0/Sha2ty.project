"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = __importDefault(require("../models/Users"));
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
const generateToken = (userId, role) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not configured");
    }
    return jsonwebtoken_1.default.sign({
        id: userId,
        role,
    }, secret, {
        expiresIn: "1d",
    });
};
const register = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;
        if (!fullName || !email || !password || !role) {
            return res.status(400).json({
                message: "Full name, email, password and role are required",
            });
        }
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Please provide a valid email address",
            });
        }
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters and contain uppercase, lowercase, number and special character",
            });
        }
        if (role !== "Lister" && role !== "Seeker") {
            return res.status(400).json({
                message: "Role must be either Lister or Seeker",
            });
        }
        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await Users_1.default.findOne({
            email: normalizedEmail,
        });
        if (existingUser) {
            return res.status(409).json({
                message: "A user with this email already exists",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await Users_1.default.create({
            fullName: fullName.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            role,
        });
        const token = generateToken(user._id.toString(), user.role);
        return res.status(201).json({
            message: "Registration successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({
            message: "Server error during registration",
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }
        const normalizedEmail = email.toLowerCase().trim();
        const user = await Users_1.default.findOne({
            email: normalizedEmail,
        });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const passwordMatches = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const token = generateToken(user._id.toString(), user.role);
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Server error during login",
        });
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map