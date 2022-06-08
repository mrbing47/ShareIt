@echo off
title Stream Video

set DEST="E:\Web Projects\shareit"

if "%1"=="" ( set ROOT=%CD% ) else ( set ROOT=%1 )

echo ***** WELCOME TO SHAREIT *****
echo ** Starting at %ROOT% **
cd /d %DEST%

npm start
