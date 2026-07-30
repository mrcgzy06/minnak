$userDir = $env:USERPROFILE
$ghPath = "$userDir\gh\bin\gh.exe"
$gitPath = "$userDir\git\cmd\git.exe"

& $gitPath add .
& $gitPath commit -m "Fix mobile responsive grid, card scaling, and UI layout spacing"

$token = (& $ghPath auth token).Trim()
& $gitPath push "https://${token}@github.com/mrcgzy06/minnak.git" main
Write-Host "SUCCESS: Mobile UI updates pushed to GitHub!"
