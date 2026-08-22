"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListingRequests = exports.cancelInterestRequest = exports.getMyInterestRequests = exports.updateRequestStatus = exports.createRequest = void 0;
const Listing_1 = require("../models/Listing");
const InterestRequest_1 = require("../models/InterestRequest");
const createRequest = async (req, res) => {
    try {
        const { listingId } = req.body;
        const userId = req.user?.id;
        const listing = await Listing_1.Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const newRequest = await InterestRequest_1.InterestRequest.create({
            listing: listingId,
            user: userId,
        });
        const total = await InterestRequest_1.InterestRequest.countDocuments({ listing: listingId });
        return res.status(201).json({
            success: true,
            data: newRequest,
            page,
            limit,
            total,
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.createRequest = createRequest;
const updateRequestStatus = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { status } = req.body;
        const userId = req.user?.id;
        const request = await InterestRequest_1.InterestRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        request.status = status;
        await request.save();
        const total = await InterestRequest_1.InterestRequest.countDocuments({ user: userId });
        return res.status(200).json({
            success: true,
            data: request,
            page,
            limit,
            total,
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateRequestStatus = updateRequestStatus;
const getMyInterestRequests = async (req, res) => {
    try {
        const userId = req.user?.id;
        const requests = await InterestRequest_1.InterestRequest.find({
            user: userId,
        }).populate("listing");
        return res.status(200).json({
            requests,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to get interest requests",
            error,
        });
    }
};
exports.getMyInterestRequests = getMyInterestRequests;
const cancelInterestRequest = async (req, res) => {
    try {
        const request = await InterestRequest_1.InterestRequest.findById(req.params.id);
        if (!request) {
            return res.status(404).json({
                message: "Interest request not found",
            });
        }
        const userId = req.user?.id;
        if (request.user?.toString() !== userId) {
            return res.status(403).json({
                message: "You can only cancel your own requests",
            });
        }
        await InterestRequest_1.InterestRequest.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Interest request cancelled successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to cancel interest request",
            error,
        });
    }
};
exports.cancelInterestRequest = cancelInterestRequest;
// GET REQUESTS FOR MY LISTING
const getListingRequests = async (req, res) => {
    try {
        const listing = await Listing_1.Listing.findById(req.params.listingId);
        if (!listing) {
            return res.status(404).json({
                message: "Listing not found",
            });
        }
        const requests = await InterestRequest_1.InterestRequest.find({
            listing: req.params.listingId,
        }).populate("user");
        return res.status(200).json({
            requests,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to get listing requests",
            error,
        });
    }
};
exports.getListingRequests = getListingRequests;
//# sourceMappingURL=request.controllers.js.map