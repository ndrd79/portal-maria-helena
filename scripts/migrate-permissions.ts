import { createClient } from '@supabase/supabase-js';
import { Permission, Role, UserRole } from '../src/types/permissions';

// Tipos específicos para migração
interface OldUserData {
  id: string;
  tipo: 'admin' | 'comerciante' | 'usuario';
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // Usar service key para bypass RLS
);

async function migratePermissions() {
  console.log('Iniciando migração de permissões...');

  try {
    // 1. Buscar todos os usuários existentes
    const { data: users, error: usersError } = await supabase
      .from('usuarios')
      .select('id, tipo');

    if (usersError) throw usersError;
    
    console.log(`Encontrados ${users.length} usuários para migração`);

    // 2. Para cada usuário, criar as roles apropriadas
    for (const user of users) {
      await migrateUserPermissions(user);
    }

    console.log('Migração concluída com sucesso!');

  } catch (error) {
    console.error('Erro durante migração:', error);
    process.exit(1);
  }
}

async function migrateUserPermissions(user: OldUserData) {
  console.log(`Migrando permissões para usuário ${user.id}...`);

  try {
    // 1. Identificar role baseado no tipo
    const { data: role } = await supabase
      .from('roles')
      .select('id')
      .eq('name', user.tipo)
      .single();

    if (!role) {
      console.warn(`Role não encontrada para tipo ${user.tipo}`);
      return;
    }

    // 2. Criar relação user_roles
    const { error: roleError } = await supabase
      .from('user_roles')
      .upsert({
        user_id: user.id,
        role_id: role.id
      });

    if (roleError) throw roleError;

    // 3. Criar permissões customizadas se necessário
    if (user.tipo === 'comerciante') {
      const { error: permError } = await supabase
        .from('user_permissions')
        .upsert({
          user_id: user.id,
          custom_permissions: ['read:comercios', 'update:comercios']
        });

      if (permError) throw permError;
    }

    console.log(`Migração concluída para usuário ${user.id}`);

  } catch (error) {
    console.error(`Erro ao migrar usuário ${user.id}:`, error);
    throw error;
  }
}

// Executar migração
migratePermissions();
