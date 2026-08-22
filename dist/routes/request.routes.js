"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_controllers_1 = require("../controllers/request.controllers");
const router = express_1.default.Router();
// Create interest request
router.post("/", request_controllers_1.createRequest);
// Get my interest requests
router.get("/my", request_controllers_1.getMyInterestRequests);
// Cancel my interest request
router.delete("/:id", request_controllers_1.cancelInterestRequest);
// Get requests for my listing
router.get("/listing/:listingId", request_controllers_1.getListingRequests);
// Accept or decline request
router.patch("/:id/status", request_controllers_1.updateRequestStatus);
exports.default = router;
//# sourceMappingURL=request.routes.js.map