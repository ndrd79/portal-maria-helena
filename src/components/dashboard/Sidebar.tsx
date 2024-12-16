import { useState } from 'react';
import Link from 'next/link';
import { 
  NewspaperIcon, 
  SpeakerphoneIcon, 
  ChartBarIcon,
  CogIcon,
  HomeIcon,
  UserIcon,
  LogoutIcon,
} from '@heroicons/react/outline';

const Sidebar = ({ onLogout }: { onLogout: () => void }) => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, href: '/dashboard' },
    { name: 'Notícias', icon: NewspaperIcon, href: '/dashboard/noticias' },
    { name: 'Propagandas', icon: SpeakerphoneIcon, href: '/dashboard/propagandas' },
    { name: 'Seção Agro', icon: ChartBarIcon, href: '/dashboard/agro' },
    { name: 'Configurações', icon: CogIcon, href: '/dashboard/configuracoes' },
  ];

  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed left-0 top-0">
      <div className="p-4">
        <h2 className="text-xl font-bold">Portal Admin</h2>
      </div>
      
      <nav className="mt-8">
        <div className="px-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-700 
                  ${activeItem === item.name.toLowerCase() ? 'bg-gray-900 text-white' : 'text-gray-300'}`}
                onClick={() => setActiveItem(item.name.toLowerCase())}
              >
                <Icon className="mr-4 h-6 w-6" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="absolute bottom-0 w-full p-4">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-2 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700"
        >
          <LogoutIcon className="mr-4 h-6 w-6" />
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
