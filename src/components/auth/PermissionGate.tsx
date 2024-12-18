import { ReactNode } from 'react';
import { usePermissionContext } from '@/contexts/PermissionContext';
import { Permission } from '@/types/permissions';

interface PermissionGateProps {
  children: ReactNode;
  permissions: Permission[];
  fallback?: ReactNode;
  requireAll?: boolean;
}

export function PermissionGate({ 
  children, 
  permissions, 
  fallback = null,
  requireAll = true 
}: PermissionGateProps) {
  const { checkPermission } = usePermissionContext();

  const hasPermission = requireAll
    ? permissions.every(permission => checkPermission(permission))
    : permissions.some(permission => checkPermission(permission));

  if (!hasPermission) {
    return fallback;
  }

  return children;
}
