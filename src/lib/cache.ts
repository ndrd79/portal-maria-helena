import { kv } from '@vercel/kv';
import { UserPermissions, Permission } from '../types/permissions';

export class CacheService {
  private static instance: CacheService;
  private readonly CACHE_TTL = 3600; // 1 hora em segundos
  private readonly PREFIX = {
    permissions: 'permissions:',
    roles: 'roles:',
  };

  private constructor() {}

  static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  // Permissões do usuário
  async getUserPermissions(userId: string): Promise<UserPermissions | null> {
    const key = this.PREFIX.permissions + userId;
    return await kv.get<UserPermissions>(key);
  }

  async setUserPermissions(userId: string, permissions: UserPermissions): Promise<void> {
    const key = this.PREFIX.permissions + userId;
    await kv.set(key, permissions, { ex: this.CACHE_TTL });
  }

  async deleteUserPermissions(userId: string): Promise<void> {
    const key = this.PREFIX.permissions + userId;
    await kv.del(key);
  }

  // Cache de verificação de permissão específica
  async hasPermission(userId: string, permission: Permission): Promise<boolean | null> {
    const key = `${this.PREFIX.permissions}${userId}:${permission}`;
    return await kv.get<boolean>(key);
  }

  async setPermissionCheck(
    userId: string, 
    permission: Permission, 
    granted: boolean
  ): Promise<void> {
    const key = `${this.PREFIX.permissions}${userId}:${permission}`;
    await kv.set(key, granted, { ex: this.CACHE_TTL });
  }

  // Limpar cache
  async clearUserCache(userId: string): Promise<void> {
    const pattern = `${this.PREFIX.permissions}${userId}*`;
    const keys = await kv.keys(pattern);
    if (keys.length > 0) {
      await kv.del(...keys);
    }
  }

  // Métodos de diagnóstico
  async getCacheStats(userId: string): Promise<{
    permissionsCached: boolean;
    lastUpdated?: string;
    cacheSize?: number;
  }> {
    const key = this.PREFIX.permissions + userId;
    const data = await kv.get<UserPermissions>(key);
    
    return {
      permissionsCached: !!data,
      lastUpdated: data?.updated_at,
      cacheSize: data ? JSON.stringify(data).length : 0,
    };
  }
}
