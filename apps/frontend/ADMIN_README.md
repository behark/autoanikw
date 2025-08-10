# AutoAni Admin Dashboard

A complete admin dashboard for managing your AutoAni luxury vehicle inventory. Built with Next.js, TypeScript, and Tailwind CSS to match your existing design system.

## Features

### 🚗 Vehicle Management
- **Complete CRUD Operations**: Create, read, update, and delete vehicles
- **Rich Vehicle Data**: Support for all vehicle properties including specs, features, categories
- **Image Upload**: Multiple image support with primary image selection
- **Status Management**: Track vehicle availability (Available, Sold, Reserved)
- **Bulk Operations**: Select and manage multiple vehicles at once
- **Advanced Filtering**: Filter by brand, status, price range, and search

### 📊 Analytics Dashboard
- **Key Metrics**: Total vehicles, sales, revenue, conversion rates
- **Sales Trends**: Monthly performance visualization
- **Brand Analytics**: Top performing brands and categories
- **Recent Sales**: Track latest transactions
- **Performance Insights**: Best performing months and metrics

### ⚙️ Settings Management
- **General Settings**: Site configuration, contact information
- **Notifications**: Email alerts for inquiries, low stock, sales reports
- **Display Settings**: Vehicles per page, price display options
- **Business Settings**: Tax rates, payment methods, business hours

### 🎨 Design System
- **Consistent Branding**: Matches your existing AutoAni design
- **Responsive Layout**: Works perfectly on desktop and mobile
- **Professional UI**: Clean, modern interface with proper spacing
- **Accessibility**: Screen reader friendly and keyboard navigation

## File Structure

```
frontend/autoani/
├── pages/admin/
│   ├── index.tsx                 # Main dashboard
│   ├── vehicles/
│   │   └── index.tsx            # Vehicle management
│   ├── analytics.tsx            # Analytics page
│   └── settings.tsx             # Settings page
├── src/components/admin/
│   ├── layout/
│   │   └── AdminLayout.tsx      # Admin sidebar layout
│   └── components/
│       ├── StatsCard.tsx        # Statistics display card
│       ├── VehicleTable.tsx     # Vehicle listing table
│       └── VehicleForm.tsx      # Vehicle creation/editing form
└── src/services/
    └── adminAPI.ts              # API service layer
```

## Getting Started

### 1. Access the Admin Dashboard
Navigate to `/admin` in your browser to access the admin dashboard.

### 2. Navigation
The admin dashboard includes a sidebar with the following sections:
- **Dashboard**: Overview and quick actions
- **Vehicles**: Manage your vehicle inventory
- **Analytics**: View sales performance and insights
- **Settings**: Configure application settings

### 3. Managing Vehicles

#### Adding a New Vehicle:
1. Go to **Vehicles** → Click **Add Vehicle**
2. Fill in all required information:
   - Basic info (title, brand, model, year, price)
   - Technical specs (engine, fuel, transmission, power)
   - Description and features
   - Upload multiple images
   - Set status and options
3. Click **Create Vehicle**

#### Editing Vehicles:
1. In the vehicles table, click **Edit** on any vehicle
2. Modify the information as needed
3. Click **Update Vehicle**

#### Vehicle Status Management:
- **Available**: Vehicle is for sale
- **Reserved**: Vehicle is held for a customer
- **Sold**: Vehicle has been sold

### 4. Analytics Features
- View monthly sales trends
- Track top-performing brands
- Monitor key performance indicators
- Review recent sales activity

### 5. Settings Configuration
Configure various aspects of your application:
- Update contact information
- Set notification preferences
- Customize display options
- Configure business settings

## API Integration

The admin dashboard connects to your existing backend API:

### Environment Variables
Create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Supported Endpoints
- `GET /api/vehicles` - List vehicles
- `POST /api/vehicles` - Create vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle
- `GET /api/vehicles/categories` - Get categories
- `GET /api/vehicles/brands` - Get brands

## Design Customization

### Colors
The dashboard uses your existing primary color scheme:
- Primary Gold: `#D4AF37`
- Dark Gold: `#B8941F`
- Supporting neutrals for backgrounds and text

### Responsive Design
The dashboard is fully responsive with:
- Mobile-first approach
- Collapsible sidebar on mobile
- Responsive tables and forms
- Touch-friendly interface

## Security Considerations

### Production Deployment
For production use, consider adding:
1. **Authentication**: User login and session management
2. **Authorization**: Role-based access control
3. **HTTPS**: Secure communication
4. **Input Validation**: Server-side validation
5. **File Upload Security**: Image validation and virus scanning

### Authentication Integration
The current layout includes placeholders for authentication:
- User avatar and name display
- Logout functionality
- Session management

## Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Check if backend server is running
   - Verify API URL in environment variables
   - Check network connectivity

2. **Image Upload Problems**
   - Ensure backend supports multipart/form-data
   - Check file size limits
   - Verify upload directory permissions

3. **Styling Issues**
   - Run `npm run build` to rebuild Tailwind CSS
   - Check for conflicting CSS classes
   - Verify Tailwind configuration

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## Future Enhancements

### Potential Additions
- **Customer Management**: Track customer inquiries and purchases
- **Inventory Alerts**: Low stock notifications
- **Reporting**: Detailed sales and inventory reports
- **Bulk Import**: CSV/Excel vehicle import
- **Image Management**: Advanced image editing and optimization
- **SEO Tools**: Meta tags and content optimization
- **Multi-language Support**: Internationalization
- **Dark Mode**: Theme switching capability

### Integration Options
- **CRM Integration**: Connect with customer management systems
- **Payment Processing**: Integrate payment gateways
- **Email Marketing**: Connect with email platforms
- **Analytics**: Google Analytics integration
- **Backup Systems**: Automated data backup

## Support

The admin dashboard is designed to be intuitive and user-friendly. All components follow your existing design patterns and are built with modern web standards for optimal performance and accessibility.
