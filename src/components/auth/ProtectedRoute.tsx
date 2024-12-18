import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { usePermissionContext } from '@/contexts/PermissionContext';
import { Permission } from '@/types/permissions';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
  permissions?: Permission[];
  fallback?: ReactNode;
}

export function ProtectedRoute({ 
  children, 
  permissions = [], 
  fallback = <LoadingSpinner />
}: ProtectedRouteProps) {
  const router = useRouter();
  const { checkPermission, loading } = usePermissionContext();

  // Se estiver carregando, mostra o fallback
  if (loading) {
    return fallback;
  }

  // Se não houver permissões requeridas, renderiza o conteúdo
  if (permissions.length === 0) {
    return children;
  }

  // Verifica todas as permissões
  const hasAllPermissions = permissions.every(permission => checkPermission(permission));

  if (!hasAllPermissions) {
    router.push('/acesso-negado');
    return fallback;
  }

  return children;
}
