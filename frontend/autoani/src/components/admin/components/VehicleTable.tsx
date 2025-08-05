import React, { useState } from 'react';

interface Vehicle {
  _id: string;
  title: string;
  brand: string;
  vehicleModel: string;
  year: number;
  price: number;
  mileage: number;
  status: 'available' | 'sold' | 'reserved';
  images: Array<{ url: string; isPrimary?: boolean }>;
}

interface VehicleTableProps {
  vehicles: Vehicle[];
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (vehicleId: string) => void;
  loading?: boolean;
}

const VehicleTable: React.FC<VehicleTableProps> = ({ vehicles, onEdit, onDelete, loading = false }) => {
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);

  const handleSelectAll = () => {
    if (selectedVehicles.length === vehicles.length) {
      setSelectedVehicles([]);
    } else {
      setSelectedVehicles(vehicles.map(v => v._id));
    }
  };

  const handleSelectVehicle = (vehicleId: string) => {
    setSelectedVehicles(prev => 
      prev.includes(vehicleId) 
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      available: 'bg-green-100 text-green-800',
      sold: 'bg-red-100 text-red-800',
      reserved: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="bg-white shadow-sm rounded-lg">
        <div className="animate-pulse">
          <div className="h-12 bg-neutral-200 rounded-t-lg"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-t border-neutral-200 p-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-neutral-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                  <div className="h-3 bg-neutral-200 rounded w-1/6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-neutral-900">Vehicles</h3>
          {selectedVehicles.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-neutral-600">{selectedVehicles.length} selected</span>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                Delete Selected
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedVehicles.length === vehicles.length && vehicles.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Vehicle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Mileage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {vehicles.map((vehicle) => (
              <tr key={vehicle._id} className="hover:bg-neutral-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedVehicles.includes(vehicle._id)}
                    onChange={() => handleSelectVehicle(vehicle._id)}
                    className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16">
                      <img
                        className="h-16 w-16 rounded-lg object-cover"
                        src={vehicle.images?.[0]?.url || '/placeholder-car.jpg'}
                        alt={vehicle.title}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-neutral-900">{vehicle.title}</div>
                      <div className="text-sm text-neutral-500">{vehicle.year} • {vehicle.brand} {vehicle.vehicleModel}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-neutral-900">
                    ${vehicle.price.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">
                    {vehicle.mileage.toLocaleString()} mi
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(vehicle.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onEdit(vehicle)}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(vehicle._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {vehicles.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-neutral-900">No vehicles</h3>
          <p className="mt-1 text-sm text-neutral-500">Get started by adding a new vehicle.</p>
        </div>
      )}
    </div>
  );
};

export default VehicleTable;
