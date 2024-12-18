import { createContext, useContext, ReactNode } from 'react';
import { Permission, UserPermissions } from '../types/permissions';
import { usePermissions } from '../hooks/usePermissions';
import { useUser } from '../hooks/useUser';

interface PermissionContextType {
  permissions: UserPermissions | null;
  loading: boolean;
  error: Error | null;
  checkPermission: (permission: Permission) => Promise<boolean>;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

interface PermissionProviderProps {
  children: ReactNode;
}

export function PermissionProvider({ children }: PermissionProviderProps) {
  const { user } = useUser();
  const { permissions, loading, error, checkPermission } = usePermissions(user?.id || null);

  return (
    <PermissionContext.Provider value={{ permissions, loading, error, checkPermission }}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissionContext() {
  const context = useContext(PermissionContext);
  if (context === undefined) {
    throw new Error('usePermissionContext deve ser usado dentro de um PermissionProvider');
  }
  return context;
}
