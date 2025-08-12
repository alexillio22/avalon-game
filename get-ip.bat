@echo off
echo Buscando la IP de Windows en la red 192.168.1.x...
echo.
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set ip=%%a
    set ip=!ip: =!
    echo IP encontrada: !ip!
    echo !ip! | findstr "192.168.1" >nul
    if !errorlevel! equ 0 (
        echo *** ESTA ES TU IP PARA EL IPHONE: !ip! ***
        echo URL para Safari: http://!ip!:3000
    )
)
echo.
pause
