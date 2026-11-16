# Keep the static publishing directory in sync with the project source.
$sourceFiles = @('index.html', 'styles.css', 'data.js', 'app.js')
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$dist = Join-Path $projectRoot 'dist'
New-Item -ItemType Directory -Path $dist -Force | Out-Null
foreach ($file in $sourceFiles) {
    Copy-Item -LiteralPath (Join-Path $projectRoot $file) -Destination (Join-Path $dist $file) -Force
}
Write-Output "Synced $($sourceFiles.Count) files to dist/."
