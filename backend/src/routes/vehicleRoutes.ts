import express from 'express';
import { 
  getVehicles, 
  getVehicleById, 
  createVehicle, 
  updateVehicle, 
  deleteVehicle,
  getVehicleCategories,
  getVehicleBrands
} from '../controllers/vehicleController';
import { uploadVehicleImages } from '../middleware/fileUpload';

const router = express.Router();

// @route   GET /api/vehicles
// @desc    Get all vehicles with filtering
// @access  Public
router.get('/', getVehicles);

// @route   GET /api/vehicles/:id
// @desc    Get vehicle by id
// @access  Public
router.get('/:id', getVehicleById);

// @route   POST /api/vehicles
// @desc    Create a new vehicle
// @access  Private (will add auth middleware later)
router.post('/', uploadVehicleImages, createVehicle);

// @route   PUT /api/vehicles/:id
// @desc    Update a vehicle
// @access  Private
router.put('/:id', uploadVehicleImages, updateVehicle);

// @route   DELETE /api/vehicles/:id
// @desc    Delete a vehicle
// @access  Private
router.delete('/:id', deleteVehicle);

// @route   GET /api/vehicles/categories
// @desc    Get all vehicle categories
// @access  Public
router.get('/categories/all', getVehicleCategories);

// @route   GET /api/vehicles/brands
// @desc    Get all vehicle brands
// @access  Public
router.get('/brands/all', getVehicleBrands);

export default router;
