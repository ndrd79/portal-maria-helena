import { z } from 'zod';

// Tipos básicos
export type ResourceType = 'usuarios' | 'comercios' | 'produtos' | 'noticias' | 'anuncios';
export type ActionType = 'create' | 'read' | 'update' | 'delete' | 'manage';

// Permissão individual
export type Permission = `${ActionType}:${ResourceType}`;

// Schema Zod para validação
export const PermissionSchema = z.custom<Permission>((val) => {
  return typeof val === 'string' && /^(create|read|update|delete|manage):(usuarios|comercios|produtos|noticias|anuncios)$/.test(val);
}, 'Formato inválido de permissão');

// Interface para Role (Função)
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  level: number; // Para hierarquia de funções
  created_at: string;
  updated_at: string;
}

// Schema Zod para Role
export const RoleSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  description: z.string(),
  permissions: z.array(PermissionSchema),
  level: z.number().min(0),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
});

// Interface para UserPermissions
export interface UserPermissions {
  userId: string;
  roles: Role[];
  customPermissions?: Permission[]; // Permissões específicas do usuário
  restrictions?: Permission[]; // Restrições específicas
  created_at: string;
  updated_at: string;
}

// Schema Zod para UserPermissions
export const UserPermissionsSchema = z.object({
  userId: z.string().uuid(),
  roles: z.array(RoleSchema),
  customPermissions: z.array(PermissionSchema).optional(),
  restrictions: z.array(PermissionSchema).optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
});

// Tipos para respostas da API
export interface PermissionResponse {
  granted: boolean;
  reason?: string;
}

// Funções auxiliares
export function createPermission(action: ActionType, resource: ResourceType): Permission {
  return `${action}:${resource}`;
}

export function parsePermission(permission: Permission): { action: ActionType; resource: ResourceType } {
  const [action, resource] = permission.split(':') as [ActionType, ResourceType];
  return { action, resource };
}

// Constantes
export const DEFAULT_PERMISSIONS: Permission[] = [
  'read:produtos',
  'read:noticias'
] as Permission[];

export const ADMIN_PERMISSIONS: Permission[] = [
  'manage:usuarios',
  'manage:comercios',
  'manage:produtos',
  'manage:noticias',
  'manage:anuncios'
] as Permission[];

export const COMERCIANTE_PERMISSIONS: Permission[] = [
  'create:comercios',
  'update:comercios',
  'read:comercios',
  'create:produtos',
  'update:produtos',
  'delete:produtos',
  'read:produtos'
] as Permission[];
