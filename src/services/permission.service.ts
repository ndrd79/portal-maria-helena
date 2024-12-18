import { createClient } from '@supabase/supabase-js';
import { CacheService } from '../lib/cache';
import { Permission, Role, UserPermissions, parsePermission } from '../types/permissions';
import { Database } from '../types/database';

export class PermissionService {
  private static instance: PermissionService;
  private cache: CacheService;
  private supabase;

  private constructor() {
    this.cache = CacheService.getInstance();
    this.supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  static getInstance(): PermissionService {
    if (!PermissionService.instance) {
      PermissionService.instance = new PermissionService();
    }
    return PermissionService.instance;
  }

  async getUserPermissions(userId: string): Promise<UserPermissions | null> {
    // Tentar cache primeiro
    const cached = await this.cache.getUserPermissions(userId);
    if (cached) return cached;

    // Buscar do banco
    const { data: roles, error: rolesError } = await this.supabase
      .from('user_roles')
      .select('roles(*)')
      .eq('user_id', userId);

    if (rolesError) {
      console.error('Erro ao buscar roles:', rolesError);
      return null;
    }

    const { data: customPerms, error: permsError } = await this.supabase
      .from('user_permissions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (permsError && permsError.code !== 'PGRST116') { // Ignora erro de não encontrado
      console.error('Erro ao buscar permissões:', permsError);
      return null;
    }

    const permissions: UserPermissions = {
      userId,
      roles: roles?.map(r => r.roles) || [],
      customPermissions: customPerms?.custom_permissions || [],
      restrictions: customPerms?.restrictions || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Salvar no cache
    await this.cache.setUserPermissions(userId, permissions);

    return permissions;
  }

  async hasPermission(userId: string, requiredPermission: Permission): Promise<boolean> {
    // Verificar cache primeiro
    const cachedResult = await this.cache.hasPermission(userId, requiredPermission);
    if (cachedResult !== null) return cachedResult;

    const permissions = await this.getUserPermissions(userId);
    if (!permissions) return false;

    // Verificar restrições primeiro
    if (permissions.restrictions?.includes(requiredPermission)) {
      await this.cache.setPermissionCheck(userId, requiredPermission, false);
      return false;
    }

    // Verificar permissões customizadas
    if (permissions.customPermissions?.includes(requiredPermission)) {
      await this.cache.setPermissionCheck(userId, requiredPermission, true);
      return true;
    }

    // Verificar permissões das roles
    const { action, resource } = parsePermission(requiredPermission);
    const hasPermission = permissions.roles.some(role => {
      // Verificar permissão específica
      if (role.permissions.includes(requiredPermission)) return true;
      
      // Verificar permissão de gerenciamento
      const managePermission = `manage:${resource}` as Permission;
      return role.permissions.includes(managePermission);
    });

    await this.cache.setPermissionCheck(userId, requiredPermission, hasPermission);
    return hasPermission;
  }

  async addRole(userId: string, roleId: string): Promise<void> {
    const { error } = await this.supabase
      .from('user_roles')
      .insert({ user_id: userId, role_id: roleId });

    if (error) {
      console.error('Erro ao adicionar role:', error);
      throw error;
    }

    await this.cache.clearUserCache(userId);
  }

  async removeRole(userId: string, roleId: string): Promise<void> {
    const { error } = await this.supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId)
      .eq('role_id', roleId);

    if (error) {
      console.error('Erro ao remover role:', error);
      throw error;
    }

    await this.cache.clearUserCache(userId);
  }

  async addCustomPermission(userId: string, permission: Permission): Promise<void> {
    const { data, error } = await this.supabase
      .from('user_permissions')
      .upsert({
        user_id: userId,
        custom_permissions: this.supabase.sql`array_append(COALESCE(custom_permissions, '[]'::jsonb), ${permission})`
      });

    if (error) {
      console.error('Erro ao adicionar permissão:', error);
      throw error;
    }

    await this.cache.clearUserCache(userId);
  }

  async removeCustomPermission(userId: string, permission: Permission): Promise<void> {
    const { data, error } = await this.supabase
      .from('user_permissions')
      .upsert({
        user_id: userId,
        custom_permissions: this.supabase.sql`array_remove(COALESCE(custom_permissions, '[]'::jsonb), ${permission})`
      });

    if (error) {
      console.error('Erro ao remover permissão:', error);
      throw error;
    }

    await this.cache.clearUserCache(userId);
  }

  async addRestriction(userId: string, permission: Permission): Promise<void> {
    const { data, error } = await this.supabase
      .from('user_permissions')
      .upsert({
        user_id: userId,
        restrictions: this.supabase.sql`array_append(COALESCE(restrictions, '[]'::jsonb), ${permission})`
      });

    if (error) {
      console.error('Erro ao adicionar restrição:', error);
      throw error;
    }

    await this.cache.clearUserCache(userId);
  }

  async removeRestriction(userId: string, permission: Permission): Promise<void> {
    const { data, error } = await this.supabase
      .from('user_permissions')
      .upsert({
        user_id: userId,
        restrictions: this.supabase.sql`array_remove(COALESCE(restrictions, '[]'::jsonb), ${permission})`
      });

    if (error) {
      console.error('Erro ao remover restrição:', error);
      throw error;
    }

    await this.cache.clearUserCache(userId);
  }
}
