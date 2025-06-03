import React from 'react';
import { CampaignProvider } from './context/CampaignContext';
import CampaignDashboard from './components/CampaignDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <CampaignProvider>
        <CampaignDashboard />
      </CampaignProvider>
    </div>
  );
}

export default App;
