import { Permission, Role, UserPermissions } from './permissions';

// Tabelas do banco de dados
export interface RoleTable {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  level: number;
  created_at: string;
  updated_at: string;
}

export interface UserRoleTable {
  id: string;
  user_id: string;
  role_id: string;
  created_at: string;
}

export interface UserPermissionTable {
  id: string;
  user_id: string;
  custom_permissions?: Permission[];
  restrictions?: Permission[];
  created_at: string;
  updated_at: string;
}

// Queries SQL para criar as tabelas
export const CREATE_TABLES_SQL = {
  roles: `
    CREATE TABLE IF NOT EXISTS roles (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(255) NOT NULL UNIQUE,
      description TEXT,
      permissions JSONB NOT NULL DEFAULT '[]',
      level INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `,
  
  user_roles: `
    CREATE TABLE IF NOT EXISTS user_roles (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, role_id)
    );
  `,
  
  user_permissions: `
    CREATE TABLE IF NOT EXISTS user_permissions (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      custom_permissions JSONB,
      restrictions JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id)
    );
  `
};
