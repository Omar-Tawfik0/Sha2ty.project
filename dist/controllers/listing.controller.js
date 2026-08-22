"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteListing = exports.updateListing = exports.getListingById = exports.createListing = exports.getListings = void 0;
const Listing_1 = require("../models/Listing");
const getListings = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const listing = await Listing_1.Listing.findById(id);
            if (!listing) {
                return res.status(404).json({ message: 'Listing not found' });
            }
            return res.status(200).json({ success: true, data: listing });
        }
        const { location, minPrice, maxPrice, roomsAvailable, isAvailable, page, limit } = req.query;
        const query = {};
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice)
                query.price.$gte = Number(minPrice);
            if (maxPrice)
                query.price.$lte = Number(maxPrice);
        }
        if (roomsAvailable) {
            query.roomsAvailable = Number(roomsAvailable);
        }
        if (isAvailable !== undefined) {
            query.isAvailable = isAvailable === 'true';
        }
        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 10;
        const listings = await Listing_1.Listing.find(query)
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum);
        const total = await Listing_1.Listing.countDocuments(query);
        return res.status(200).json({
            success: true,
            count: listings.length,
            total,
            page: pageNum,
            limit: limitNum,
            data: listings,
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.getListings = getListings;
const createListing = async (req, res) => {
    try {
        const userId = req.user?.id;
        const listing = await Listing_1.Listing.create({
            ...req.body,
            owner: userId,
        });
        return res.status(201).json({
            success: true,
            data: listing,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error,
        });
    }
};
exports.createListing = createListing;
// GET LISTING BY ID
const getListingById = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing_1.Listing.findById(id);
        if (!listing) {
            return res.status(404).json({
                message: 'Listing not found',
            });
        }
        return res.status(200).json({
            success: true,
            data: listing,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error,
        });
    }
};
exports.getListingById = getListingById;
// UPDATE LISTING
const updateListing = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        const listing = await Listing_1.Listing.findById(id);
        if (!listing) {
            return res.status(404).json({
                message: 'Listing not found',
            });
        }
        if (listing.user?.toString() !== userId) {
            return res.status(403).json({
                message: 'You can only update your own listing',
            });
        }
        const updatedListing = await Listing_1.Listing.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({
            success: true,
            data: updatedListing,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error,
        });
    }
};
exports.updateListing = updateListing;
const deleteListing = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        const listing = await Listing_1.Listing.findById(id);
        if (!listing) {
            return res.status(404).json({
                message: 'Listing not found',
            });
        }
        if (listing.user?.toString() !== userId) {
            return res.status(403).json({
                message: 'You can only delete your own listing',
            });
        }
        await Listing_1.Listing.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: 'Listing deleted successfully',
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error,
        });
    }
};
exports.deleteListing = deleteListing;
//# sourceMappingURL=listing.controller.js.map