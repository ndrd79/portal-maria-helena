param(
    [Parameter(Mandatory=$true)]
    [string]$message
)

# Adiciona todas as mudanças
git add .

# Faz o commit com a mensagem fornecida
git commit -m $message

# Faz o push para o repositório remoto
git push

Write-Host "✅ Alterações enviadas com sucesso!" -ForegroundColor Green
