"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
if (!globalThis.crypto) {
    // @ts-ignore
    globalThis.crypto = crypto_1.default;
}
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(process.env.MONGO_URI || "mongodb://localhost:27017/sha2ty");
        console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
exports.default = exports.connectDB;
//# sourceMappingURL=db.js.map