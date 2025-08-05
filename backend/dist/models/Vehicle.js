"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Image schema
const VehicleImageSchema = new mongoose_1.Schema({
    url: {
        type: String,
        required: true
    },
    altText: {
        type: String,
        default: ''
    },
    isPrimary: {
        type: Boolean,
        default: false
    }
});
// Vehicle schema
const VehicleSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    subtitle: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        trim: true
    },
    vehicleModel: {
        type: String,
        required: [true, 'Model is required'],
        trim: true
    },
    year: {
        type: Number,
        required: [true, 'Year is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    engine: {
        type: String,
        required: [true, 'Engine is required']
    },
    fuel: {
        type: String,
        required: [true, 'Fuel type is required']
    },
    mileage: {
        type: Number,
        required: [true, 'Mileage is required']
    },
    power: {
        type: String,
        required: [true, 'Power is required']
    },
    transmission: {
        type: String,
        required: [true, 'Transmission is required']
    },
    color: {
        type: String,
        required: [true, 'Color is required']
    },
    images: [VehicleImageSchema],
    features: [{
            type: String,
            trim: true
        }],
    categories: [{
            type: String,
            trim: true
        }],
    isNew: {
        type: Boolean,
        default: false
    },
    hasCustoms: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        enum: ['available', 'sold', 'reserved'],
        default: 'available'
    }
}, {
    timestamps: true
});
// Add text search index for search functionality
VehicleSchema.index({
    title: 'text',
    subtitle: 'text',
    description: 'text',
    brand: 'text',
    vehicleModel: 'text'
});
exports.default = mongoose_1.default.model('Vehicle', VehicleSchema);
