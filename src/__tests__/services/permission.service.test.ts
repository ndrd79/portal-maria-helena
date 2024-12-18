import { PermissionService } from '@/services/permission.service';
import { CacheService } from '@/lib/cache';
import { Permission } from '@/types/permissions';

// Mock do Supabase
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          data: [],
          error: null
        }))
      }))
    }))
  }))
}));

// Mock do CacheService
jest.mock('@/lib/cache', () => ({
  CacheService: {
    getInstance: jest.fn(() => ({
      getUserPermissions: jest.fn(),
      setUserPermissions: jest.fn(),
      hasPermission: jest.fn(),
      setPermissionCheck: jest.fn(),
      clearUserCache: jest.fn()
    }))
  }
}));

describe('PermissionService', () => {
  let permissionService: PermissionService;
  let mockCacheService: jest.Mocked<CacheService>;

  beforeEach(() => {
    // Limpar mocks
    jest.clearAllMocks();
    
    // Inicializar serviço
    permissionService = PermissionService.getInstance();
    mockCacheService = CacheService.getInstance() as jest.Mocked<CacheService>;
  });

  describe('getUserPermissions', () => {
    it('deve retornar permissões do cache se disponível', async () => {
      const mockPermissions = {
        userId: '123',
        roles: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      mockCacheService.getUserPermissions.mockResolvedValue(mockPermissions);

      const result = await permissionService.getUserPermissions('123');

      expect(result).toBe(mockPermissions);
      expect(mockCacheService.getUserPermissions).toHaveBeenCalledWith('123');
    });

    it('deve buscar do banco se não estiver no cache', async () => {
      mockCacheService.getUserPermissions.mockResolvedValue(null);

      const result = await permissionService.getUserPermissions('123');

      expect(mockCacheService.setUserPermissions).toHaveBeenCalled();
    });
  });

  describe('hasPermission', () => {
    it('deve verificar cache primeiro', async () => {
      mockCacheService.hasPermission.mockResolvedValue(true);

      const result = await permissionService.hasPermission('123', 'read:usuarios' as Permission);

      expect(result).toBe(true);
      expect(mockCacheService.hasPermission).toHaveBeenCalledWith('123', 'read:usuarios');
    });

    it('deve verificar permissões do usuário se não estiver no cache', async () => {
      mockCacheService.hasPermission.mockResolvedValue(null);
      mockCacheService.getUserPermissions.mockResolvedValue({
        userId: '123',
        roles: [{
          id: '1',
          name: 'admin',
          permissions: ['read:usuarios'],
          level: 100,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      const result = await permissionService.hasPermission('123', 'read:usuarios' as Permission);

      expect(result).toBe(true);
      expect(mockCacheService.setPermissionCheck).toHaveBeenCalledWith('123', 'read:usuarios', true);
    });
  });
});
