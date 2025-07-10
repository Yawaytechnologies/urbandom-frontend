import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import SidebarPanel from '../components/user/SidebarPanel';
import ActivityTabs from '../components/user/ActivityTabs';
import SearchTypeFilter from '../components/user/SearchTypeFilter';
import PropertyCard from '../components/user/PropertyCard';
import EditProfile from '../components/user/EditProfile';

const allProperties = [
  {
    id: 1,
    activity: 'contacted',
    searchType: 'Buy',
    image: '/LandingPageImage.jpg',
    price: '₹2.1 Cr – ₹4.7 Cr',
    title: 'Kanthi Ravista Plots, Injambakkam',
    size: '1790 sq.ft',
    developer: 'Kanthi Group',
    phone: '8400514005',
  },
  {
    id: 2,
    activity: 'saved',
    searchType: 'Rent',
    image: '/LandingPageImage.jpg',
    price: '₹25,000/month',
    title: '2BHK in Velachery',
    size: '900 sq.ft',
    developer: 'UrbanLiving',
    phone: '9876543210',
  },
  {
    id: 3,
    activity: 'contacted',
    searchType: 'PG',
    image: '/LandingPageImage.jpg',
    price: '₹5,000/month',
    title: 'PG for Women - Guindy',
    size: 'Shared Room',
    developer: 'PGWorld',
    phone: '9090909090',
  },
];

const UserActivity = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeView, setActiveView] = useState('activity'); // 'activity' or 'editProfile'

  const activityType = searchParams.get('type') || 'contacted';
  const searchType = searchParams.get('search') || 'Buy';

  const filteredProperties = allProperties.filter(
    (p) => p.activity === activityType && p.searchType === searchType
  );

  const handleTabChange = (tab) => {
    setSearchParams({ type: tab, search: searchType });
  };

  const handleSearchTypeChange = (type) => {
    setSearchParams({ type: activityType, search: type });
  };

  return (
    
      <div className="min-h-screen bg-gray-50  sm:p-8 pt-8 flex flex-col sm:flex-row gap-6">
        <SidebarPanel onSelectMenu={setActiveView} selected={activeView} />
        
        <div className="flex-1">
          {activeView === 'activity' && (
            <>
              <h2 className="text-xl font-bold mb-4">My Activity</h2>
              <ActivityTabs active={activityType} setActive={handleTabChange} />
              <SearchTypeFilter type={searchType} setType={handleSearchTypeChange} />
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <PropertyCard key={property.id} data={property} />
                ))
              ) : (
                <p className="text-sm text-gray-600">No matching properties found.</p>
              )}
            </>
          )}

          {activeView === 'editProfile' && <EditProfile />}
        </div>
      </div>
    
  );
};

export default UserActivity;
