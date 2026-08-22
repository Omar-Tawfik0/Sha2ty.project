import { Response } from 'express';
import { Listing } from '../models/Listing';
import { InterestRequest } from '../models/InterestRequest';
import { AuthRequest } from '../types/auth';

export const createRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { listingId } = req.body;
    const userId = req.user?.id;

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const newRequest = await InterestRequest.create({
      listing: listingId,
      user: userId,
    });

    const total = await InterestRequest.countDocuments({ listing: listingId });

    return res.status(201).json({
      success: true,
      data: newRequest,
      page,
      limit,
      total,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const updateRequestStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;
    const userId = req.user?.id;

    const request = await InterestRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    request.status = status;
    await request.save();

    const total = await InterestRequest.countDocuments({ user: userId });

    return res.status(200).json({
      success: true,
      data: request,
      page,
      limit,
      total,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const getMyInterestRequests = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    const requests = await InterestRequest.find({
      user: userId,
    }).populate("listing");

    return res.status(200).json({
      requests,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get interest requests",
      error,
    });
  }
};

export const cancelInterestRequest = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const request = await InterestRequest.findById(req.params.id);

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

    await InterestRequest.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Interest request cancelled successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to cancel interest request",
      error,
    });
  }
};

// GET REQUESTS FOR MY LISTING
export const getListingRequests = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const listing = await Listing.findById(req.params.listingId);

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    const requests = await InterestRequest.find({
      listing: req.params.listingId,
    }).populate("user");

    return res.status(200).json({
      requests,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get listing requests",
      error,
    });
  }
};