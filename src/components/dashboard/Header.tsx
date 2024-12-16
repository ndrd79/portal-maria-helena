import { UserIcon, BellIcon } from '@heroicons/react/outline';

const Header = ({ user }: { user: any }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>
          
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500">
              <BellIcon className="h-6 w-6" />
            </button>
            
            <div className="ml-3 relative flex items-center">
              <div className="flex items-center">
                <UserIcon className="h-8 w-8 rounded-full bg-gray-100 p-1" />
                <span className="ml-2 text-gray-700">{user?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
