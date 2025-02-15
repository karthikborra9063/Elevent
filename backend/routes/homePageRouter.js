import express from 'express';

const router = express.Router();

import {getTopBanners,getTopEvents} from '../controller/homePageController.js'

router.get('/banners',getTopBanners);
router.get('/events',getTopEvents);

export default router;