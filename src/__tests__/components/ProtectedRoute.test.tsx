import { render, screen } from '@testing-library/react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { usePermissionContext } from '@/contexts/PermissionContext';
import { useRouter } from 'next/navigation';

// Mocks
jest.mock('@/contexts/PermissionContext');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('ProtectedRoute', () => {
  const mockRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('deve renderizar children quando não há permissões requeridas', () => {
    (usePermissionContext as jest.Mock).mockReturnValue({
      loading: false,
      checkPermission: jest.fn()
    });

    render(
      <ProtectedRoute>
        <div>Conteúdo protegido</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Conteúdo protegido')).toBeInTheDocument();
  });

  it('deve renderizar fallback quando estiver carregando', () => {
    (usePermissionContext as jest.Mock).mockReturnValue({
      loading: true,
      checkPermission: jest.fn()
    });

    render(
      <ProtectedRoute permissions={['read:usuarios']}>
        <div>Conteúdo protegido</div>
      </ProtectedRoute>
    );

    expect(screen.queryByText('Conteúdo protegido')).not.toBeInTheDocument();
  });

  it('deve redirecionar quando não tem permissão', () => {
    (usePermissionContext as jest.Mock).mockReturnValue({
      loading: false,
      checkPermission: jest.fn().mockReturnValue(false)
    });

    render(
      <ProtectedRoute permissions={['read:usuarios']}>
        <div>Conteúdo protegido</div>
      </ProtectedRoute>
    );

    expect(mockRouter.push).toHaveBeenCalledWith('/acesso-negado');
  });

  it('deve renderizar children quando tem todas as permissões', () => {
    (usePermissionContext as jest.Mock).mockReturnValue({
      loading: false,
      checkPermission: jest.fn().mockReturnValue(true)
    });

    render(
      <ProtectedRoute permissions={['read:usuarios']}>
        <div>Conteúdo protegido</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Conteúdo protegido')).toBeInTheDocument();
  });
});
