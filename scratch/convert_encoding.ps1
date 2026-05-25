$path = 'd:\MLN111\tutuonghcm\src\app\timeline\[slug]\page.tsx'
$content = Get-Content -LiteralPath $path -Raw
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
Write-Host "Conversion completed successfully."
