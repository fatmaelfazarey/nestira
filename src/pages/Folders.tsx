
import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Folder, Plus } from 'lucide-react';
import { FolderManagementButton } from '@/components/FolderManagementButton';

const Folders = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Folders Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Folders</h1>
              <p className="text-gray-600">Organize your candidates into folders</p>
            </div>
            
            <FolderManagementButton>
              <Plus className="w-4 h-4 mr-2" />
              Manage Folders
            </FolderManagementButton>
          </div>

          {/* Simple Folders List */}
          <div className="space-y-2">
            {[
              { name: 'Logistics coordinator', count: 12 },
              { name: 'Finance Managers', count: 8 },  
              { name: 'Senior Analysts', count: 15 },
              { name: 'Remote Candidates', count: 23 },
              { name: 'High Priority', count: 6 }
            ].map((folder, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                <div className="flex items-center gap-3">
                  <Folder className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">{folder.name}</span>
                </div>
                <span className="text-sm text-gray-500">{folder.count} candidates</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Folders;
