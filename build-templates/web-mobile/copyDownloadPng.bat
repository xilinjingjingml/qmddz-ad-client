@echo off
for /r ../Downloads %%i in (*.png) do (
    for /f "delims=" %%A in ('dir /b/s dst "%%~ni.png"') do (
        copy %%i  %%A
    )
)
pause