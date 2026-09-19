import { Response } from 'express';
import { Listing } from '../models/Listing';
import { AuthRequest } from '../types/auth';

export const getListings = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    
    if (id) {
      const listing = await Listing.findById(id);
      if (!listing) {
        return res.status(404).json({ message: 'Listing not found' });
      }
      return res.status(200).json({ success: true, data: listing });
    }

    const { location, minPrice, maxPrice, roomsAvailable, isAvailable, page, limit } = req.query;

    const query: any = {};

    if (location) {
      query.location = { $regex: location as string, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (roomsAvailable) {
      query.roomsAvailable = Number(roomsAvailable);
    }

    if (isAvailable !== undefined) {
      query.isAvailable = isAvailable === 'true';
    }

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;

    const listings = await Listing.find(query)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const total = await Listing.countDocuments(query);

    return res.status(200).json({
      success: true,
      count: listings.length,
      total,
      page: pageNum,
      limit: limitNum,
      data: listings,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// crud operations for listings

export const createListing = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const listing = await Listing.create({
      ...req.body,
      owner: userId,
    });

    return res.status(201).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error,
    });
  }
};

// GET LISTING BY ID
export const getListingById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({
        message: 'Listing not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error,
    });
  }
};

// UPDATE LISTING
export const updateListing = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const listing = await Listing.findById(id);

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

    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: updatedListing,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error,
    });
  }
};

export const deleteListing = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const listing = await Listing.findById(id);

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

    await Listing.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Listing deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error,
    });
  }
};
