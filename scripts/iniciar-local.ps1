$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$nodeCommand = Get-Command node.exe -ErrorAction SilentlyContinue
$nodePath = if ($nodeCommand) { $nodeCommand.Source } else { Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' }
if (!(Test-Path -LiteralPath $nodePath)) { throw 'No se encontro Node.js. Instala Node.js 20 o superior.' }
$logsPath = Join-Path $projectRoot 'logs'
New-Item -ItemType Directory -Path $logsPath -Force | Out-Null
function Test-LocalUrl($url) {
  try { return (Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2).StatusCode -eq 200 } catch { return $false }
}
function Start-LocalServer($folder, $entry, $port, $url, $name) {
  if (Test-LocalUrl $url) { return }
  if (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue) { throw "El puerto $port esta ocupado. Revisa la aplicacion que lo utiliza." }
  $process = Start-Process -FilePath $nodePath -ArgumentList $entry -WorkingDirectory (Join-Path $projectRoot $folder) -WindowStyle Hidden -RedirectStandardOutput (Join-Path $logsPath "$name.log") -RedirectStandardError (Join-Path $logsPath "$name-error.log") -PassThru
  for ($attempt = 0; $attempt -lt 30; $attempt++) {
    if (Test-LocalUrl $url) { return }
    if ($process.HasExited) { break }
    Start-Sleep -Seconds 1
  }
  throw "No se pudo iniciar $name. Revisa la carpeta logs del proyecto."
}
Start-LocalServer 'backend' 'src/server.js' 3000 'http://127.0.0.1:3000/api/health' 'backend'
Start-LocalServer 'frontend' 'node_modules/vite/bin/vite.js --host 127.0.0.1' 5173 'http://127.0.0.1:5173' 'frontend'
Start-Process 'http://127.0.0.1:5173'
Write-Host 'MenteConecta esta funcionando en http://127.0.0.1:5173'
