import { useState, useEffect } from 'react';
import { Role, Permission } from '@/types/permissions';
import { RoleService } from '@/services/role.service';
import { PermissionService } from '@/services/permission.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

export function PermissionManagement() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar as funções',
        variant: 'destructive',
      });
    }
  }

  async function handleRoleSelect(roleId: string) {
    const role = roles.find(r => r.id === roleId);
    setSelectedRole(role || null);
  }

  async function handleAddPermission(permission: Permission) {
    if (!selectedRole) return;

    try {
      const roleService = RoleService.getInstance();
      await roleService.addPermissionToRole(selectedRole.id, permission);
      await loadRoles();
      toast({
        title: 'Sucesso',
        description: 'Permissão adicionada com sucesso',
      });
    } catch (error) {
      console.error('Erro ao adicionar permissão:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível adicionar a permissão',
        variant: 'destructive',
      });
    }
  }

  async function handleRemovePermission(permission: Permission) {
    if (!selectedRole) return;

    try {
      const roleService = RoleService.getInstance();
      await roleService.removePermissionFromRole(selectedRole.id, permission);
      await loadRoles();
      toast({
        title: 'Sucesso',
        description: 'Permissão removida com sucesso',
      });
    } catch (error) {
      console.error('Erro ao remover permissão:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível remover a permissão',
        variant: 'destructive',
      });
    }
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Tabs defaultValue="roles" className="w-full">
      <TabsList>
        <TabsTrigger value="roles">Funções</TabsTrigger>
        <TabsTrigger value="permissions">Permissões</TabsTrigger>
      </TabsList>

      <TabsContent value="roles">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Funções</CardTitle>
            <CardDescription>
              Selecione uma função para gerenciar suas permissões
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="role">Função</Label>
                <Select onValueChange={handleRoleSelect}>
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

              {selectedRole && (
                <div className="grid gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Permissões Atuais</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedRole.permissions.map(permission => (
                        <Button
                          key={permission}
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemovePermission(permission)}
                        >
                          {permission} ×
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Adicionar Permissão</h3>
                    <Select onValueChange={handleAddPermission}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma permissão" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(Permission).map(permission => (
                          <SelectItem key={permission} value={permission}>
                            {permission}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="permissions">
        <Card>
          <CardHeader>
            <CardTitle>Permissões Disponíveis</CardTitle>
            <CardDescription>
              Lista de todas as permissões disponíveis no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {Object.values(Permission).map(permission => (
                <div
                  key={permission}
                  className="p-4 border rounded-lg"
                >
                  <h4 className="font-medium">{permission}</h4>
                  <p className="text-sm text-gray-500">
                    {getPermissionDescription(permission)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function getPermissionDescription(permission: Permission): string {
  const descriptions: Record<Permission, string> = {
    'read:usuarios': 'Visualizar usuários',
    'create:usuarios': 'Criar usuários',
    'update:usuarios': 'Atualizar usuários',
    'delete:usuarios': 'Deletar usuários',
    'manage:usuarios': 'Gerenciar todos os aspectos de usuários',
    // Adicione mais descrições conforme necessário
  };

  return descriptions[permission] || permission;
}
