
import { DashboardLayout } from '@/components/DashboardLayout';
import HelpCenterBot from '@/components/HelpCenterBot';

const HelpCenter = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
            <p className="text-gray-600">Get help and support for your hiring needs</p>
          </div>
        </div>

        {/* AI Help Bot Section - Responsive */}
        <div className="w-full max-w-4xl mx-auto">
          <HelpCenterBot />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HelpCenter;
