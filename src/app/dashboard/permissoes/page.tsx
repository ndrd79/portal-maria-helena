import { Metadata } from 'next';
import { PermissionManagement } from '@/components/auth/PermissionManagement';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export const metadata: Metadata = {
  title: 'Gerenciamento de Permissões | Portal Maria Helena',
  description: 'Gerencie as permissões e funções dos usuários do sistema',
};

export default function PermissoesPage() {
  return (
    <ProtectedRoute permissions={['manage:usuarios']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Gerenciamento de Permissões</h1>
        <PermissionManagement />
      </div>
    </ProtectedRoute>
  );
}
