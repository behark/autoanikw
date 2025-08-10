import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AdminLayout from '../../../src/components/admin/layout/AdminLayout';
import VehicleTable from '../../../src/components/admin/components/VehicleTable';
import VehicleForm from '../../../src/components/admin/components/VehicleForm';
import { adminAPI } from '../../../src/services/adminAPI';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface Vehicle {
  _id: string;
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
  features: string[];
  categories: string[];
  isNew: boolean;
  hasCustoms: boolean;
  status: 'available' | 'sold' | 'reserved';
  images: Array<{ url: string; isPrimary?: boolean }>;
}

const VehiclesManagement = () => {
  const { t } = useTranslation('common');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();

  // Fetch vehicles from API
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const response = await adminAPI.getVehicles();
        setVehicles(response.vehicles || response || []);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        // Fallback to mock data if API fails
        setVehicles([
          {
            _id: '1',
            title: '2024 BMW X5 M50i',
            description: 'Luxury SUV with premium features and exceptional performance.',
            brand: 'BMW',
            vehicleModel: 'X5',
            year: 2024,
            price: 75000,
            engine: '4.4L V8 Twin Turbo',
            fuel: 'Gasoline',
            mileage: 2500,
            power: '523hp',
            transmission: 'Automatic',
            color: 'Alpine White',
            features: ['Leather Seats', 'Navigation', 'Sunroof', 'Premium Audio'],
            categories: ['SUV', 'Luxury'],
            isNew: true,
            hasCustoms: false,
            status: 'available',
            images: [{ url: '/placeholder-car.jpg', isPrimary: true }]
          },
          {
            _id: '2',
            title: '2023 Mercedes-Benz S-Class',
            description: 'The epitome of luxury and sophistication in sedan form.',
            brand: 'Mercedes-Benz',
            vehicleModel: 'S-Class',
            year: 2023,
            price: 95000,
            engine: '3.0L I6 Turbo',
            fuel: 'Gasoline',
            mileage: 8500,
            power: '429hp',
            transmission: 'Automatic',
            color: 'Obsidian Black',
            features: ['Massage Seats', 'Air Suspension', 'Burmester Audio', 'Panoramic Roof'],
            categories: ['Sedan', 'Luxury'],
            isNew: false,
            hasCustoms: true,
            status: 'reserved',
            images: [{ url: '/placeholder-car.jpg', isPrimary: true }]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleAddVehicle = () => {
    setEditingVehicle(null);
    setShowForm(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setShowForm(true);
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    if (window.confirm(t('admin.vehicleManager.confirmDelete.message'))) {
      try {
        await adminAPI.deleteVehicle(vehicleId);
        setVehicles(vehicles.filter(v => v._id !== vehicleId));
      } catch (error) {
        console.error('Error deleting vehicle:', error);
        alert('Error deleting vehicle. Please try again.');
      }
    }
  };

  const handleFormSubmit = async (vehicleData: any, images: FileList | null) => {
    setFormLoading(true);
    
    try {
      if (editingVehicle) {
        // Update existing vehicle
        const updatedVehicle = await adminAPI.updateVehicle(editingVehicle._id!, vehicleData, images || undefined);
        setVehicles(vehicles.map(v => 
          v._id === editingVehicle._id 
            ? { ...updatedVehicle, _id: editingVehicle._id }
            : v
        ));
      } else {
        // Add new vehicle
        const newVehicle = await adminAPI.createVehicle(vehicleData, images || undefined);
        setVehicles([newVehicle, ...vehicles]);
      }
      
      setShowForm(false);
      setEditingVehicle(null);
    } catch (error) {
      console.error('Error saving vehicle:', error);
      alert('Error saving vehicle. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingVehicle(null);
  };

  return (
    <>
      <Head>
        <title>{t('admin.vehicleManager.title')} - AutoAni</title>
        <meta name="description" content={t('admin.vehicleManager.description')} />
      </Head>

      <AdminLayout>
        <div className="space-y-6">
          {!showForm ? (
            <>
              {/* Page Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-neutral-900">{t('admin.vehicleManager.title')}</h1>
                  <p className="text-neutral-600">{t('admin.vehicleManager.description')}</p>
                </div>
                <button
                  onClick={handleAddVehicle}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center"
                >
                  <span className="mr-2">+</span>
                  {t('admin.vehicleManager.addVehicle')}
                </button>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
                <div className="flex flex-wrap gap-4">
                  <select className="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="">All Brands</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Audi">Audi</option>
                    <option value="Porsche">Porsche</option>
                  </select>
                  
                  <select className="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="">{t('admin.vehicleManager.table.status')}</option>
                    <option value="available">{t('admin.vehicleManager.status.available')}</option>
                    <option value="sold">{t('admin.vehicleManager.status.sold')}</option>
                    <option value="reserved">{t('admin.vehicleManager.status.reserved')}</option>
                  </select>
                  
                  <input
                    type="text"
                    placeholder={t('admin.vehicleManager.search')}
                    className="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-0 flex-1"
                  />
                  
                  <button className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-md hover:bg-neutral-200">
                    {t('admin.vehicleManager.filter')}
                  </button>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
                  <div className="text-2xl font-bold text-neutral-900">{vehicles.length}</div>
                  <div className="text-sm text-neutral-600">{t('admin.dashboard.stats.totalVehicles')}</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {vehicles.filter(v => v.status === 'available').length}
                  </div>
                  <div className="text-sm text-neutral-600">{t('admin.vehicleManager.status.available')}</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
                  <div className="text-2xl font-bold text-red-600">
                    {vehicles.filter(v => v.status === 'sold').length}
                  </div>
                  <div className="text-sm text-neutral-600">{t('admin.vehicleManager.status.sold')}</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
                  <div className="text-2xl font-bold text-yellow-600">
                    {vehicles.filter(v => v.status === 'reserved').length}
                  </div>
                  <div className="text-sm text-neutral-600">{t('admin.vehicleManager.status.reserved')}</div>
                </div>
              </div>

              {/* Vehicles Table */}
              <VehicleTable
                vehicles={vehicles}
                onEdit={handleEditVehicle}
                onDelete={handleDeleteVehicle}
                loading={loading}
              />
            </>
          ) : (
            <>
              {/* Form Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-neutral-900">
                    {editingVehicle ? t('admin.vehicleManager.form.title') : t('admin.dashboard.quickActions.addVehicle.title')}
                  </h1>
                  <p className="text-neutral-600">
                    {editingVehicle ? t('admin.vehicleManager.form.title') : t('admin.dashboard.quickActions.addVehicle.description')}
                  </p>
                </div>
                <button
                  onClick={handleFormCancel}
                  className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50"
                >
                  {t('admin.vehicleManager.form.buttons.cancel')}
                </button>
              </div>

              {/* Vehicle Form */}
              <VehicleForm
                vehicle={editingVehicle}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                loading={formLoading}
              />
            </>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default VehiclesManagement;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
