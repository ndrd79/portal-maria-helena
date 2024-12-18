import { createClient } from '@supabase/supabase-js';
import { Permission, Role } from '../types/permissions';
import { Database } from '../types/database';
import { CacheService } from '../lib/cache';

export class RoleService {
  private static instance: RoleService;
  private cache: CacheService;
  private supabase;

  private constructor() {
    this.cache = CacheService.getInstance();
    this.supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  static getInstance(): RoleService {
    if (!RoleService.instance) {
      RoleService.instance = new RoleService();
    }
    return RoleService.instance;
  }

  async getAllRoles(): Promise<Role[]> {
    const { data, error } = await this.supabase
      .from('roles')
      .select('*')
      .order('level', { ascending: false });

    if (error) {
      console.error('Erro ao buscar roles:', error);
      throw error;
    }

    return data;
  }

  async getRoleById(id: string): Promise<Role | null> {
    const { data, error } = await this.supabase
      .from('roles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Não encontrado
      console.error('Erro ao buscar role:', error);
      throw error;
    }

    return data;
  }

  async createRole(role: Omit<Role, 'id' | 'created_at' | 'updated_at'>): Promise<Role> {
    const { data, error } = await this.supabase
      .from('roles')
      .insert(role)
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar role:', error);
      throw error;
    }

    return data;
  }

  async updateRole(id: string, role: Partial<Role>): Promise<Role> {
    const { data, error } = await this.supabase
      .from('roles')
      .update(role)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar role:', error);
      throw error;
    }

    // Limpar cache de todos os usuários com esta role
    const { data: userRoles } = await this.supabase
      .from('user_roles')
      .select('user_id')
      .eq('role_id', id);

    if (userRoles) {
      await Promise.all(
        userRoles.map(ur => this.cache.clearUserCache(ur.user_id))
      );
    }

    return data;
  }

  async deleteRole(id: string): Promise<void> {
    // Primeiro, pegar todos os usuários afetados para limpar o cache depois
    const { data: userRoles } = await this.supabase
      .from('user_roles')
      .select('user_id')
      .eq('role_id', id);

    const { error } = await this.supabase
      .from('roles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar role:', error);
      throw error;
    }

    // Limpar cache dos usuários afetados
    if (userRoles) {
      await Promise.all(
        userRoles.map(ur => this.cache.clearUserCache(ur.user_id))
      );
    }
  }

  async addPermissionToRole(roleId: string, permission: Permission): Promise<void> {
    const { data: role } = await this.getRoleById(roleId);
    if (!role) throw new Error('Role não encontrada');

    const permissions = [...role.permissions, permission];
    await this.updateRole(roleId, { permissions });
  }

  async removePermissionFromRole(roleId: string, permission: Permission): Promise<void> {
    const { data: role } = await this.getRoleById(roleId);
    if (!role) throw new Error('Role não encontrada');

    const permissions = role.permissions.filter(p => p !== permission);
    await this.updateRole(roleId, { permissions });
  }

  async getUsersByRole(roleId: string): Promise<string[]> {
    const { data, error } = await this.supabase
      .from('user_roles')
      .select('user_id')
      .eq('role_id', roleId);

    if (error) {
      console.error('Erro ao buscar usuários da role:', error);
      throw error;
    }

    return data.map(ur => ur.user_id);
  }
}
