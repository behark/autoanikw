import { Router } from 'express';
import { body, query } from 'express-validator';
import { auth, requireRole } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';
import {
  getDashboardStats,
  getActivityLogs,
  getSystemHealth
} from '../controllers/admin.controller';
import {
  uploadMedia,
  bulkUploadMedia,
  getMediaList,
  getMediaById,
  updateMedia,
  deleteMedia
} from '../controllers/media.controller';

const router = Router();

// All admin routes require authentication and admin/manager role
router.use(auth);
router.use(requireRole(['admin', 'manager']));

// Dashboard routes
router.get('/dashboard', getDashboardStats);
router.get('/system-health', getSystemHealth);

// Activity logs
router.get('/activity-logs', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('userId').optional().isMongoId(),
  query('action').optional().isString(),
  query('resource').optional().isString(),
  query('dateFrom').optional().isISO8601(),
  query('dateTo').optional().isISO8601(),
], getActivityLogs);

// Media management routes
router.post('/media/upload', [
  upload.single('file'),
  body('category').isIn([
    'vehicle_image',
    'vehicle_document',
    'user_avatar',
    'website_content',
    'banner',
    'logo',
    'other'
  ]),
  body('alt').optional().isString().trim(),
  body('caption').optional().isString().trim(),
  body('tags').optional().isString(),
  body('vehicleId').optional().isMongoId(),
], uploadMedia);

router.post('/media/bulk-upload', [
  upload.array('files', 10), // Max 10 files
  body('category').isIn([
    'vehicle_image',
    'vehicle_document',
    'user_avatar',
    'website_content',
    'banner',
    'logo',
    'other'
  ]),
  body('vehicleId').optional().isMongoId(),
], bulkUploadMedia);

router.get('/media', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('category').optional().isString(),
  query('vehicleId').optional().isMongoId(),
  query('search').optional().isString(),
  query('sortBy').optional().isString(),
  query('sortOrder').optional().isIn(['asc', 'desc']),
], getMediaList);

router.get('/media/:id', getMediaById);

router.put('/media/:id', [
  body('alt').optional().isString().trim(),
  body('caption').optional().isString().trim(),
  body('tags').optional().isString(),
  body('category').optional().isIn([
    'vehicle_image',
    'vehicle_document',
    'user_avatar',
    'website_content',
    'banner',
    'logo',
    'other'
  ]),
], updateMedia);

router.delete('/media/:id', deleteMedia);

export default router;
