const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface Vehicle {
  _id?: string;
  title: string;
  subtitle?: string;
  description: string;
  brand: string;
  vehicleModel: string;
  year: number;
  price: number;
  engine: string;
  fuel: string;
  mileage: number;
  power: string;
  transmission: string;
  color: string;
  images?: Array<{
    url: string;
    altText: string;
    isPrimary: boolean;
  }>;
  features?: string[];
  categories?: string[];
  isNew?: boolean;
  hasCustoms?: boolean;
  status?: 'available' | 'sold' | 'reserved';
  createdAt?: Date;
  updatedAt?: Date;
}

class AdminAPI {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Vehicle endpoints
  async getVehicles(params: Record<string, any> = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/vehicles${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  async getVehicleById(id: string) {
    return this.request(`/vehicles/${id}`);
  }

  async createVehicle(vehicleData: Vehicle, images?: FileList) {
    const formData = new FormData();
    
    // Add vehicle data
    Object.entries(vehicleData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    // Add images
    if (images) {
      Array.from(images).forEach((file, index) => {
        formData.append('images', file);
        if (index === 0) {
          formData.append('primaryImageIndex', '0');
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/vehicles`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async updateVehicle(id: string, vehicleData: Vehicle, images?: FileList) {
    const formData = new FormData();
    
    // Add vehicle data
    Object.entries(vehicleData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    // Add images if provided
    if (images && images.length > 0) {
      Array.from(images).forEach((file, index) => {
        formData.append('images', file);
        if (index === 0) {
          formData.append('primaryImageIndex', '0');
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async deleteVehicle(id: string) {
    return this.request(`/vehicles/${id}`, { method: 'DELETE' });
  }

  async getVehicleCategories() {
    return this.request('/vehicles/categories');
  }

  async getVehicleBrands() {
    return this.request('/vehicles/brands');
  }

  // Analytics endpoints (mock for now - implement on backend)
  async getAnalytics() {
    // Mock data - implement real analytics on backend
    return {
      totalVehicles: 47,
      availableVehicles: 32,
      soldThisMonth: 8,
      totalRevenue: 485000,
      salesTrend: [
        { month: 'Jan', sales: 12, revenue: 450000 },
        { month: 'Feb', sales: 18, revenue: 680000 },
        { month: 'Mar', sales: 15, revenue: 620000 },
        { month: 'Apr', sales: 22, revenue: 850000 },
        { month: 'May', sales: 28, revenue: 1100000 },
        { month: 'Jun', sales: 25, revenue: 950000 }
      ],
      topBrands: [
        { brand: 'BMW', count: 15, percentage: 32 },
        { brand: 'Mercedes-Benz', count: 12, percentage: 26 },
        { brand: 'Audi', count: 10, percentage: 21 },
        { brand: 'Porsche', count: 6, percentage: 13 },
        { brand: 'Lexus', count: 4, percentage: 8 }
      ]
    };
  }
}

export const adminAPI = new AdminAPI();
export default adminAPI;
