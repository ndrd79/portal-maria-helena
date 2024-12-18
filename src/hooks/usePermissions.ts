import { useEffect, useState } from 'react';
import { Permission, UserPermissions } from '../types/permissions';
import { PermissionService } from '../services/permission.service';

export function usePermissions(userId: string | null) {
  const [permissions, setPermissions] = useState<UserPermissions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setPermissions(null);
      setLoading(false);
      return;
    }

    const permissionService = PermissionService.getInstance();
    
    async function loadPermissions() {
      try {
        const userPermissions = await permissionService.getUserPermissions(userId);
        setPermissions(userPermissions);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar permissões:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    loadPermissions();
  }, [userId]);

  const checkPermission = async (permission: Permission): Promise<boolean> => {
    if (!userId) return false;
    
    try {
      const permissionService = PermissionService.getInstance();
      return await permissionService.hasPermission(userId, permission);
    } catch (err) {
      console.error('Erro ao verificar permissão:', err);
      return false;
    }
  };

  return {
    permissions,
    loading,
    error,
    checkPermission
  };
}
