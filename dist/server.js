"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dns_1 = __importDefault(require("dns"));
dns_1.default.setServers(['8.8.8.8', '8.8.4.4']);
const db_1 = require("./config/db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
(0, db_1.connectDB)()
    .then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`🚀 Server is running on: http://localhost:${PORT}`);
        console.log(`📚 Swagger Docs available at: http://localhost:${PORT}/api-docs`);
    });
})
    .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
});
//# sourceMappingURL=server.js.map