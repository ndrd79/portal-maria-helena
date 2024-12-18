import { useState, useEffect } from 'react';
import { Role } from '@/types/permissions';
import { RoleService } from '@/services/role.service';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface RoleSelectorProps {
  userId: string;
  onRoleChange?: (roleId: string) => void;
}

export function RoleSelector({ userId, onRoleChange }: RoleSelectorProps) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoles();
  }, []);

  async function loadRoles() {
    try {
      const roleService = RoleService.getInstance();
      const allRoles = await roleService.getAllRoles();
      setRoles(allRoles);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar roles:', error);
    }
  }

  function handleRoleChange(roleId: string) {
    setSelectedRole(roleId);
    onRoleChange?.(roleId);
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="role">Função do Usuário</Label>
      <Select value={selectedRole} onValueChange={handleRoleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione uma função" />
        </SelectTrigger>
        <SelectContent>
          {roles.map(role => (
            <SelectItem key={role.id} value={role.id}>
              {role.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
