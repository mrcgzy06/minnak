$userDir = $env:USERPROFILE
$ghPath = "$userDir\gh\bin\gh.exe"
$gitPath = "$userDir\git\cmd\git.exe"

& $gitPath add .
& $gitPath commit -m "Full Viewport Fluid UI/UX: Mathematical card sizing filling available height/width with zero blank voids"

$token = (& $ghPath auth token).Trim()
& $gitPath push "https://${token}@github.com/mrcgzy06/minnak.git" main
Write-Host "SUCCESS: Full viewport fluid UI/UX pushed to GitHub!"
