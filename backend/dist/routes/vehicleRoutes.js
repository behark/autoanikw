"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vehicleController_1 = require("../controllers/vehicleController");
const fileUpload_1 = require("../middleware/fileUpload");
const router = express_1.default.Router();
// @route   GET /api/vehicles
// @desc    Get all vehicles with filtering
// @access  Public
router.get('/', vehicleController_1.getVehicles);
// @route   GET /api/vehicles/:id
// @desc    Get vehicle by id
// @access  Public
router.get('/:id', vehicleController_1.getVehicleById);
// @route   POST /api/vehicles
// @desc    Create a new vehicle
// @access  Private (will add auth middleware later)
router.post('/', fileUpload_1.uploadVehicleImages, vehicleController_1.createVehicle);
// @route   PUT /api/vehicles/:id
// @desc    Update a vehicle
// @access  Private
router.put('/:id', fileUpload_1.uploadVehicleImages, vehicleController_1.updateVehicle);
// @route   DELETE /api/vehicles/:id
// @desc    Delete a vehicle
// @access  Private
router.delete('/:id', vehicleController_1.deleteVehicle);
// @route   GET /api/vehicles/categories
// @desc    Get all vehicle categories
// @access  Public
router.get('/categories/all', vehicleController_1.getVehicleCategories);
// @route   GET /api/vehicles/brands
// @desc    Get all vehicle brands
// @access  Public
router.get('/brands/all', vehicleController_1.getVehicleBrands);
exports.default = router;
