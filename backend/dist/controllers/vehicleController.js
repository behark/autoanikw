"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehicleBrands = exports.getVehicleCategories = exports.deleteVehicle = exports.updateVehicle = exports.createVehicle = exports.getVehicleById = exports.getVehicles = void 0;
const Vehicle_1 = __importDefault(require("../models/Vehicle"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Get all vehicles with filters
const getVehicles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { brand, model, year, minPrice, maxPrice, fuel, status, page = 1, limit = 12 } = req.query;
        // Build filter object
        const filter = {};
        if (brand)
            filter.brand = { $regex: brand, $options: 'i' };
        if (model)
            filter.vehicleModel = { $regex: model, $options: 'i' };
        if (year)
            filter.year = year;
        if (fuel)
            filter.fuel = { $regex: fuel, $options: 'i' };
        if (status)
            filter.status = status;
        // Price range filter
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice)
                filter.price.$gte = Number(minPrice);
            if (maxPrice)
                filter.price.$lte = Number(maxPrice);
        }
        // Text search if search query provided
        if (req.query.search) {
            filter.$text = { $search: req.query.search };
        }
        // Pagination
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;
        const vehicles = yield Vehicle_1.default.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);
        const total = yield Vehicle_1.default.countDocuments(filter);
        res.json({
            vehicles,
            currentPage: pageNum,
            totalPages: Math.ceil(total / limitNum),
            totalVehicles: total
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getVehicles = getVehicles;
// Get vehicle by ID
const getVehicleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicle = yield Vehicle_1.default.findById(req.params.id);
        if (!vehicle) {
            res.status(404).json({ message: 'Vehicle not found' });
            return;
        }
        res.json(vehicle);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getVehicleById = getVehicleById;
// Create new vehicle
const createVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicleData = req.body;
        // Handle file uploads if present
        if (req.files && Array.isArray(req.files)) {
            vehicleData.images = req.files.map((file, index) => ({
                url: `/uploads/vehicles/${file.filename}`,
                altText: vehicleData.title,
                isPrimary: index === 0 // First uploaded image is primary by default
            }));
        }
        // Create new vehicle
        const vehicle = new Vehicle_1.default(vehicleData);
        yield vehicle.save();
        res.status(201).json(vehicle);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createVehicle = createVehicle;
// Update vehicle
const updateVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        // Find vehicle first to get existing images
        const vehicle = yield Vehicle_1.default.findById(id);
        if (!vehicle) {
            res.status(404).json({ message: 'Vehicle not found' });
            return;
        }
        // Handle file uploads if present
        if (req.files && Array.isArray(req.files) && req.files.length > 0) {
            // Keep existing images if not replacing them completely
            const existingImages = updateData.keepExistingImages ? (vehicle.images || []) : [];
            // Add new images
            const newImages = req.files.map((file) => ({
                url: `/uploads/vehicles/${file.filename}`,
                altText: updateData.title || vehicle.title,
                isPrimary: false
            }));
            updateData.images = [...existingImages, ...newImages];
        }
        // Handle image deletion
        if (updateData.imagesToDelete && Array.isArray(updateData.imagesToDelete)) {
            // Delete image files from server
            for (const imageUrl of updateData.imagesToDelete) {
                const imagePath = path_1.default.join(__dirname, '../../', imageUrl.replace('/', ''));
                if (fs_1.default.existsSync(imagePath)) {
                    fs_1.default.unlinkSync(imagePath);
                }
            }
            // Filter out deleted images from database
            if (vehicle.images && updateData.images) {
                updateData.images = updateData.images.filter((img) => !updateData.imagesToDelete.includes(img.url));
            }
            else if (vehicle.images) {
                updateData.images = vehicle.images.filter((img) => !updateData.imagesToDelete.includes(img.url));
            }
            // Remove imagesToDelete from update data
            delete updateData.imagesToDelete;
            delete updateData.keepExistingImages;
        }
        // Update vehicle
        const updatedVehicle = yield Vehicle_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });
        res.json(updatedVehicle);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateVehicle = updateVehicle;
// Delete vehicle
const deleteVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Find vehicle first to get images
        const vehicle = yield Vehicle_1.default.findById(id);
        if (!vehicle) {
            res.status(404).json({ message: 'Vehicle not found' });
            return;
        }
        // Delete image files from server
        if (vehicle.images && vehicle.images.length > 0) {
            for (const image of vehicle.images) {
                const imagePath = path_1.default.join(__dirname, '../../', image.url.replace('/', ''));
                if (fs_1.default.existsSync(imagePath)) {
                    fs_1.default.unlinkSync(imagePath);
                }
            }
        }
        // Delete vehicle from database
        yield Vehicle_1.default.findByIdAndDelete(id);
        res.json({ message: 'Vehicle deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteVehicle = deleteVehicle;
// Get vehicle categories
const getVehicleCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Aggregate to get distinct categories
        const categories = yield Vehicle_1.default.aggregate([
            { $unwind: '$categories' },
            { $group: { _id: '$categories', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        res.json(categories.map(cat => ({ name: cat._id, count: cat.count })));
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getVehicleCategories = getVehicleCategories;
// Get vehicle brands
const getVehicleBrands = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Aggregate to get distinct brands with counts
        const brands = yield Vehicle_1.default.aggregate([
            { $group: { _id: '$brand', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        res.json(brands.map(brand => ({ name: brand._id, count: brand.count })));
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getVehicleBrands = getVehicleBrands;
