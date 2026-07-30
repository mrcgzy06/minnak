$userDir = $env:USERPROFILE
$ghPath = "$userDir\gh\bin\gh.exe"
$gitPath = "$userDir\git\cmd\git.exe"

& $gitPath add .
& $gitPath commit -m "Major UI/UX Overhaul: Fluid Desktop (wide landscape) and Mobile (tall portrait) adaptive layouts"

$token = (& $ghPath auth token).Trim()
& $gitPath push "https://${token}@github.com/mrcgzy06/minnak.git" main
Write-Host "SUCCESS: UI/UX overhaul pushed to GitHub!"
