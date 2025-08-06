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
        // Parse arrays that come as stringified JSON
        if (vehicleData.features && typeof vehicleData.features === 'string') {
            try {
                vehicleData.features = JSON.parse(vehicleData.features);
            }
            catch (e) {
                vehicleData.features = [];
            }
        }
        if (vehicleData.categories && typeof vehicleData.categories === 'string') {
            try {
                vehicleData.categories = JSON.parse(vehicleData.categories);
            }
            catch (e) {
                vehicleData.categories = [];
            }
        }
        // Handle file uploads if present
        if (req.files && Array.isArray(req.files)) {
            const primaryIndex = parseInt(vehicleData.primaryImageIndex) || 0;
            vehicleData.images = req.files.map((file, index) => ({
                url: `/uploads/vehicles/${file.filename}`,
                altText: vehicleData.title || `Vehicle image ${index + 1}`,
                isPrimary: index === primaryIndex
            }));
        }
        // Create new vehicle
        const vehicle = new Vehicle_1.default(vehicleData);
        yield vehicle.save();
        res.status(201).json(vehicle);
    }
    catch (error) {
        console.error('Error creating vehicle:', error);
        res.status(400).json({ message: error.message });
    }
});
exports.createVehicle = createVehicle;
// Update vehicle
const updateVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        // Parse arrays that come as stringified JSON
        if (updateData.features && typeof updateData.features === 'string') {
            try {
                updateData.features = JSON.parse(updateData.features);
            }
            catch (e) {
                delete updateData.features;
            }
        }
        if (updateData.categories && typeof updateData.categories === 'string') {
            try {
                updateData.categories = JSON.parse(updateData.categories);
            }
            catch (e) {
                delete updateData.categories;
            }
        }
        // Parse existing images if they came as a string
        if (updateData.existingImages && typeof updateData.existingImages === 'string') {
            try {
                updateData.existingImages = JSON.parse(updateData.existingImages);
            }
            catch (e) {
                updateData.existingImages = [];
            }
        }
        // Find vehicle first to get existing images
        const vehicle = yield Vehicle_1.default.findById(id);
        if (!vehicle) {
            res.status(404).json({ message: 'Vehicle not found' });
            return;
        }
        // Prepare final images array
        let finalImages = [];
        // Handle existing images if specified
        if (updateData.existingImages && Array.isArray(updateData.existingImages)) {
            finalImages = [...updateData.existingImages];
            // Remove existingImages from update data as we'll set the final images at the end
            delete updateData.existingImages;
        }
        else {
            // If no existingImages specified, keep all current ones
            finalImages = vehicle.images || [];
        }
        // Handle images to delete
        if (updateData.imagesToDelete && typeof updateData.imagesToDelete === 'string') {
            try {
                updateData.imagesToDelete = JSON.parse(updateData.imagesToDelete);
            }
            catch (e) {
                updateData.imagesToDelete = [];
            }
        }
        if (updateData.imagesToDelete && Array.isArray(updateData.imagesToDelete)) {
            // Delete image files from server
            for (const imageUrl of updateData.imagesToDelete) {
                try {
                    const imagePath = path_1.default.join(__dirname, '../../', imageUrl.replace(/^\//, ''));
                    if (fs_1.default.existsSync(imagePath)) {
                        fs_1.default.unlinkSync(imagePath);
                        console.log(`Deleted image: ${imagePath}`);
                    }
                }
                catch (error) {
                    console.error(`Failed to delete image: ${error}`);
                }
            }
            // Filter out deleted images from final images array
            finalImages = finalImages.filter((img) => !updateData.imagesToDelete.includes(img.url));
            // Remove imagesToDelete from update data
            delete updateData.imagesToDelete;
        }
        // Handle file uploads if present
        if (req.files && Array.isArray(req.files) && req.files.length > 0) {
            const primaryIndex = parseInt(updateData.primaryImageIndex) || 0;
            // Add new images
            const newImages = req.files.map((file, index) => ({
                url: `/uploads/vehicles/${file.filename}`,
                altText: updateData.title || vehicle.title,
                isPrimary: index === primaryIndex && finalImages.every((img) => !img.isPrimary)
            }));
            // Append new images to final images array
            finalImages = [...finalImages, ...newImages];
        }
        // Ensure we have one primary image
        let hasPrimaryImage = finalImages.some((img) => img.isPrimary);
        if (!hasPrimaryImage && finalImages.length > 0) {
            finalImages[0].isPrimary = true;
        }
        // Set the final images to the update data
        updateData.images = finalImages;
        // Remove unnecessary fields
        delete updateData.primaryImageIndex;
        // Update vehicle
        const updatedVehicle = yield Vehicle_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });
        res.json(updatedVehicle);
    }
    catch (error) {
        console.error('Error updating vehicle:', error);
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
