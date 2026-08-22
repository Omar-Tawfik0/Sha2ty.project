
import express from "express";

import {
  createRequest,
  getMyInterestRequests,
  cancelInterestRequest,
  getListingRequests,
  updateRequestStatus,
} from "../controllers/request.controllers";

const router = express.Router();

// Create interest request
router.post("/", createRequest);

// Get my interest requests
router.get("/my", getMyInterestRequests);

// Cancel my interest request
router.delete("/:id", cancelInterestRequest);

// Get requests for my listing
router.get("/listing/:listingId", getListingRequests);

// Accept or decline request
router.patch("/:id/status", updateRequestStatus);

export default router;