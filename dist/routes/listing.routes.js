"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listing_controller_1 = require("../controllers/listing.controller");
const router = (0, express_1.Router)();
router.get('/', listing_controller_1.getListings);
router.get('/:id', listing_controller_1.getListings);
router.post('/', listing_controller_1.createListing);
router.put('/:id', listing_controller_1.updateListing);
router.delete('/:id', listing_controller_1.deleteListing);
exports.default = router;
//# sourceMappingURL=listing.routes.js.map