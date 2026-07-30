$userDir = $env:USERPROFILE
$ghPath = "$userDir\gh\bin\gh.exe"
$gitPath = "$userDir\git\cmd\git.exe"

& $gitPath add .
& $gitPath commit -m "Pixel-Perfect UI/UX Fix: Explicit pixel sizing per card and grid fit-content to eliminate layout gaps"

$token = (& $ghPath auth token).Trim()
& $gitPath push "https://${token}@github.com/mrcgzy06/minnak.git" main
Write-Host "SUCCESS: Pixel-perfect UI/UX pushed to GitHub!"
