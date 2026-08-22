import { Router } from 'express';
import {
  getListings,
  createListing,
  updateListing,
  deleteListing,
} from '../controllers/listing.controller';

const router = Router();

router.get('/', getListings);
router.get('/:id', getListings);
router.post('/', createListing);

router.put('/:id', updateListing);

router.delete('/:id', deleteListing);

export default router;