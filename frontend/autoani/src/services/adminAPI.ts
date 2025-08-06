const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

import { User } from '@/types/user';
import { MediaItem } from '@/types/media';
import { Vehicle, VehicleResponse, VehiclesResponse } from '@/types/vehicle';
import { MediaResponse } from '@/types/media';
import { SiteSetting, SettingsResponse, SettingUpdateResponse, defaultSettings } from '@/types/settings';
import { Notification, mockNotifications, NotificationResponse } from '@/types/notification';
import { ActivityLog, mockActivityLogs, ActivityLogResponse } from '@/types/activity';

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

  // Helper method to simulate API calls with mock data
  private async mockApiCall<T>(data: T): Promise<T> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return data;
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

  // User management endpoints
  async getUsers(params: Record<string, any> = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/users${queryString ? `?${queryString}` : ''}`;
    try {
      return await this.request(endpoint);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Return mock data for development
      return {
        users: this.getMockUsers(),
        total: this.getMockUsers().length,
        page: 1,
        limit: 10
      };
    }
  }

  async getUserById(id: string) {
    try {
      return await this.request(`/users/${id}`);
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      // Return mock data for development
      const mockUser = this.getMockUsers().find(user => user._id === id);
      if (!mockUser) throw new Error(`User with ID ${id} not found`);
      return mockUser;
    }
  }

  async createUser(userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>) {
    try {
      return await this.request('/users', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    } catch (error) {
      console.error('Error creating user:', error);
      // Return mock response for development
      const newUser = {
        ...userData,
        _id: `mock-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      console.log('Created mock user:', newUser);
      return newUser;
    }
  }

  async updateUser(id: string, userData: Partial<User>) {
    try {
      return await this.request(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      });
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      // Return mock response for development
      console.log(`Updated mock user with ID ${id}:`, userData);
      return { ...userData, _id: id, updatedAt: new Date() };
    }
  }

  async deleteUser(id: string) {
    try {
      return await this.request(`/users/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      // Return mock response for development
      console.log(`Deleted mock user with ID ${id}`);
      return { success: true, message: 'User deleted successfully' };
    }
  }

  // Media management endpoints
  async getMedia(params: Record<string, any> = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/media${queryString ? `?${queryString}` : ''}`;
    try {
      return await this.request(endpoint);
    } catch (error) {
      console.error('Error fetching media:', error);
      // Return mock data for development
      return {
        media: this.getMockMedia(),
        total: this.getMockMedia().length,
        page: 1,
        limit: 20
      };
    }
  }

  async getMediaById(id: string) {
    try {
      return await this.request(`/media/${id}`);
    } catch (error) {
      console.error(`Error fetching media with ID ${id}:`, error);
      // Return mock data for development
      const mockMedia = this.getMockMedia().find(media => media._id === id);
      if (!mockMedia) throw new Error(`Media with ID ${id} not found`);
      return mockMedia;
    }
  }

  async uploadMedia(files: FileList) {
    const formData = new FormData();
    
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch(`${API_BASE_URL}/media/upload`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error uploading media:', error);
      // Return mock response for development
      return {
        success: true,
        media: Array.from(files).map((file, index) => ({
          _id: `media-${Date.now()}-${index}`,
          filename: `${Date.now()}-${file.name.replace(/\s+/g, '-').toLowerCase()}`,
          originalFilename: file.name,
          filesize: file.size,
          mimeType: file.type,
          url: URL.createObjectURL(file),
          thumbnailUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
          altText: file.name,
          width: file.type.startsWith('image/') ? 800 : undefined,
          height: file.type.startsWith('image/') ? 600 : undefined,
          createdAt: new Date(),
          updatedAt: new Date()
        }))
      };
    }
  }

  async updateMedia(id: string, data: Partial<MediaItem>) {
    try {
      return await this.request(`/media/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error(`Error updating media with ID ${id}:`, error);
      // Return mock response for development
      return { ...data, _id: id, updatedAt: new Date() };
    }
  }

  async deleteMedia(id: string) {
    try {
      return await this.request(`/media/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(`Error deleting media with ID ${id}:`, error);
      // Return mock response for development
      return { success: true, message: 'Media deleted successfully' };
    }
  }

  async bulkDeleteMedia(ids: string[]) {
    try {
      return await this.request('/media/bulk-delete', {
        method: 'POST',
        body: JSON.stringify({ ids })
      });
    } catch (error) {
      console.error('Error bulk deleting media:', error);
      // Return mock response for development
      return { success: true, message: `${ids.length} media items deleted successfully` };
    }
  }

  // Settings Methods
  async getSettings(): Promise<SettingsResponse> {
    try {
      // In a real API, this would fetch from the backend
      const response = await this.mockApiCall({
        success: true,
        settings: this.getMockSettings()
      });
      return response;
    } catch (error) {
      console.error('Error getting settings:', error);
      return { success: false, settings: [], message: 'Failed to fetch settings' };
    }
  }

  async updateSetting(key: string, value: any): Promise<SettingUpdateResponse> {
    try {
      // In a real API, this would update the setting in the database
      const mockSettings = this.getMockSettings();
      const settingIndex = mockSettings.findIndex(setting => setting.key === key);
      
      if (settingIndex === -1) {
        return { success: false, message: 'Setting not found' };
      }
      
      const updatedSetting = {
        ...mockSettings[settingIndex],
        value,
        updatedAt: new Date().toISOString()
      };
      
      // In a real implementation, this would save to the backend
      return {
        success: true,
        setting: updatedSetting,
        message: 'Setting updated successfully'
      };
    } catch (error) {
      console.error('Error updating setting:', error);
      return { success: false, message: 'Failed to update setting' };
    }
  }

  async bulkUpdateSettings(settings: Record<string, any>): Promise<SettingsResponse> {
    try {
      // In a real API, this would update multiple settings at once
      const mockSettings = this.getMockSettings();
      const updatedSettings = mockSettings.map(setting => {
        if (settings.hasOwnProperty(setting.key)) {
          return {
            ...setting,
            value: settings[setting.key],
            updatedAt: new Date().toISOString()
          };
        }
        return setting;
      });
      
      return {
        success: true,
        settings: updatedSettings,
        message: 'Settings updated successfully'
      };
    } catch (error) {
      console.error('Error updating settings:', error);
      return { success: false, settings: [], message: 'Failed to update settings' };
    }
  }

  // Notification methods
  async getNotifications(): Promise<NotificationResponse> {
    try {
      // TODO: Replace with real API call
      // const response = await this.request('/notifications');
      // return response.data;
      
      // Mock implementation
      const notifications = this.getMockNotifications();
      const unreadCount = notifications.filter(n => !n.isRead).length;
      
      return {
        success: true,
        notifications,
        unreadCount
      };
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return { success: false, notifications: [], unreadCount: 0, message: 'Failed to fetch notifications' };
    }
  }

  async markNotificationAsRead(notificationId: string) {
    try {
      // TODO: Replace with real API call
      // await this.request(`/notifications/${notificationId}/read`, {
      //   method: 'PUT'
      // });
      
      // Mock implementation
      // In a real implementation, this would update the backend
      
      return {
        success: true,
        message: 'Notification marked as read'
      };
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return { success: false, message: 'Failed to mark notification as read' };
    }
  }

  async markAllNotificationsAsRead() {
    try {
      // TODO: Replace with real API call
      // await this.request('/notifications/read-all', {
      //   method: 'PUT'
      // });
      
      // Mock implementation
      // In a real implementation, this would update the backend
      
      return {
        success: true,
        message: 'All notifications marked as read'
      };
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return { success: false, message: 'Failed to mark all notifications as read' };
    }
  }

  // Activity log methods
  async getActivityLogs(params: Record<string, any> = {}): Promise<ActivityLogResponse> {
    try {
      // TODO: Replace with real API call
      // const response = await this.request('/activity-logs', { params });
      // return response.data;
      
      // Mock implementation
      const logs = this.getMockActivityLogs();
      let filteredLogs = [...logs];
      
      // Apply filters if provided
      if (params.userId) {
        filteredLogs = filteredLogs.filter(log => log.userId === params.userId);
      }
      
      if (params.entityType) {
        filteredLogs = filteredLogs.filter(log => log.entityType === params.entityType);
      }
      
      if (params.action) {
        filteredLogs = filteredLogs.filter(log => log.action === params.action);
      }
      
      if (params.dateFrom) {
        const fromDate = new Date(params.dateFrom).getTime();
        filteredLogs = filteredLogs.filter(log => new Date(log.createdAt).getTime() >= fromDate);
      }
      
      if (params.dateTo) {
        const toDate = new Date(params.dateTo).getTime();
        filteredLogs = filteredLogs.filter(log => new Date(log.createdAt).getTime() <= toDate);
      }
      
      // Pagination
      const page = params.page ? parseInt(params.page) : 1;
      const limit = params.limit ? parseInt(params.limit) : 10;
      const total = filteredLogs.length;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedLogs = filteredLogs.slice(startIndex, endIndex);
      
      return {
        success: true,
        logs: paginatedLogs,
        total,
        page,
        limit
      };
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      return { 
        success: false, 
        logs: [], 
        total: 0,
        page: 1,
        limit: 10,
        message: 'Failed to fetch activity logs' 
      };
    }
  }

  async createActivityLog(logData: Partial<ActivityLog>): Promise<{success: boolean, message: string}> {
    try {
      // TODO: Replace with real API call
      // const response = await this.request('/activity-logs', {
      //   method: 'POST',
      //   body: JSON.stringify(logData)
      // });
      // return response.data;
      
      // Mock implementation
      // In a real implementation, this would add the log to the database
      
      return {
        success: true,
        message: 'Activity logged successfully'
      };
    } catch (error) {
      console.error('Error creating activity log:', error);
      return { success: false, message: 'Failed to create activity log' };
    }
  }

  async clearActivityLogs(): Promise<{success: boolean, message: string}> {
    try {
      // TODO: Replace with real API call
      // const response = await this.request('/activity-logs/clear', {
      //   method: 'DELETE'
      // });
      // return response.data;
      
      // Mock implementation
      // In a real implementation, this would clear logs based on criteria
      
      return {
        success: true,
        message: 'Activity logs cleared successfully'
      };
    } catch (error) {
      console.error('Error clearing activity logs:', error);
      return { success: false, message: 'Failed to clear activity logs' };
    }
  }

  // Helper methods for mock data
  private getMockMedia(): MediaItem[] {
    return [
      {
        _id: 'media-1',
        filename: 'bmw-x5-2023.jpg',
        originalFilename: 'BMW X5 2023.jpg',
        filesize: 2500000,
        mimeType: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3',
        thumbnailUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&w=200',
        altText: 'BMW X5 2023 front view',
        width: 1920,
        height: 1080,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      },
      {
        _id: 'media-2',
        filename: 'mercedes-s-class.jpg',
        originalFilename: 'Mercedes S-Class.jpg',
        filesize: 3200000,
        mimeType: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3',
        thumbnailUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&w=200',
        altText: 'Mercedes S-Class luxury sedan',
        width: 1920,
        height: 1080,
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
      },
      {
        _id: 'media-3',
        filename: 'audi-a8-interior.jpg',
        originalFilename: 'Audi A8 Interior.jpg',
        filesize: 1800000,
        mimeType: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3',
        thumbnailUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&w=200',
        altText: 'Audi A8 luxury interior dashboard',
        width: 1920,
        height: 1080,
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
      },
      {
        _id: 'media-4',
        filename: 'porsche-911.jpg',
        originalFilename: 'Porsche 911.jpg',
        filesize: 2900000,
        mimeType: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3',
        thumbnailUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&w=200',
        altText: 'Porsche 911 sports car',
        width: 1920,
        height: 1080,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      },
      {
        _id: 'media-5',
        filename: 'vehicle-specs.pdf',
        originalFilename: 'Vehicle Specifications.pdf',
        filesize: 5000000,
        mimeType: 'application/pdf',
        url: '/mock-files/vehicle-specs.pdf',
        altText: 'Vehicle specifications document',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      },
      {
        _id: 'media-6',
        filename: 'lexus-ls.jpg',
        originalFilename: 'Lexus LS.jpg',
        filesize: 2200000,
        mimeType: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1533473359331-40f8afb4b4d8?ixlib=rb-4.0.3',
        thumbnailUrl: 'https://images.unsplash.com/photo-1533473359331-40f8afb4b4d8?ixlib=rb-4.0.3&w=200',
        altText: 'Lexus LS luxury sedan',
        width: 1920,
        height: 1080,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        _id: 'media-7',
        filename: 'tesla-model-s.jpg',
        originalFilename: 'Tesla Model S.jpg',
        filesize: 1900000,
        mimeType: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3',
        thumbnailUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&w=200',
        altText: 'Tesla Model S electric vehicle',
        width: 1920,
        height: 1080,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        _id: 'media-8',
        filename: 'warranty-info.pdf',
        originalFilename: 'Warranty Information.pdf',
        filesize: 3500000,
        mimeType: 'application/pdf',
        url: '/mock-files/warranty-info.pdf',
        altText: 'Warranty information document',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ];
  }

  private getMockUsers(): User[] {
    return [
      {
        _id: 'user-1',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@autoani.com',
        role: 'admin',
        status: 'active',
        lastLogin: new Date(),
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      },
      {
        _id: 'user-2',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@autoani.com',
        role: 'manager',
        status: 'active',
        lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      },
      {
        _id: 'user-3',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@autoani.com',
        role: 'editor',
        status: 'active',
        lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        _id: 'user-4',
        firstName: 'Robert',
        lastName: 'Johnson',
        email: 'robert@autoani.com',
        role: 'viewer',
        status: 'inactive',
        lastLogin: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
      },
      {
        _id: 'user-5',
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria@autoani.com',
        role: 'editor',
        status: 'pending',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      }
    ];
  }

  private getMockSettings(): SiteSetting[] {
    // Convert the default settings grouped by category into a flat array
    const now = new Date().toISOString();
    let id = 1;
    
    return Object.values(defaultSettings).flat().map(setting => ({
      _id: `setting_${id++}`,
      key: setting.key!,
      value: setting.value!,
      group: setting.group!,
      label: setting.label!,
      description: setting.description,
      type: setting.type!,
      options: setting.options || [],
      isPublic: setting.isPublic!,
      createdAt: now,
      updatedAt: now
    }));
  }

  private getMockNotifications(): Notification[] {
    return mockNotifications.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  private getMockActivityLogs(): ActivityLog[] {
    return mockActivityLogs.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
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
