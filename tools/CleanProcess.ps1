# Script pour tuer les processus utilisant les ports 3000-3010
# Utilisation: .\Kill-ProcessesByPortRange.ps1

$startPort = 3000
$endPort = 3010
$killedProcesses = @()

Write-Host "Recherche des processus utilisant les ports $startPort à $endPort..." -ForegroundColor Cyan

# Parcourir chaque port dans la plage
for ($port = $startPort; $port -le $endPort; $port++) {
    try {
        # Récupérer les connexions TCP pour ce port
        $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
        
        if ($connections) {
            foreach ($connection in $connections) {
                $processID = $connection.OwningProcess
                
                # Éviter les doublons
                if ($killedProcesses -notcontains $processID) {
                    try {
                        # Récupérer le nom du processus
                        $process = Get-Process -Id $processID -ErrorAction SilentlyContinue
                        
                        if ($process) {
                            Write-Host "Port $port - PID: $processID - Processus: $($process.ProcessName)" -ForegroundColor Yellow
                            
                            # Tuer le processus de force
                            Stop-Process -Id $processID -Force -ErrorAction Stop
                            Write-Host "✓ Processus $processID ($($process.ProcessName)) tué avec succès" -ForegroundColor Green
                            
                            $killedProcesses += $processID
                        }
                    }
                    catch {
                        Write-Host "✗ Erreur lors de l'arrêt du processus $processID : $($_.Exception.Message)" -ForegroundColor Red
                    }
                }
            }
        }
    }
    catch {
        # Port non utilisé ou erreur d'accès, on continue
    }
}

if ($killedProcesses.Count -eq 0) {
    Write-Host "Aucun processus trouvé utilisant les ports $startPort à $endPort" -ForegroundColor Green
} else {
    Write-Host "`nRésumé: $($killedProcesses.Count) processus tués" -ForegroundColor Magenta
    Write-Host "PIDs tués: $($killedProcesses -join ', ')" -ForegroundColor Magenta
}