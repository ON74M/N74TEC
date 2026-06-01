@echo off
cd /d D:\N74TEC\DOWNLOAD\GitHub\N74TEC

echo ================================
echo  N74 TEC - UPDATE GIT SCRIPT
echo ================================

echo.
echo Adicionando arquivos...
git add .

echo.
echo Criando commit...
git commit -m "update site"

echo.
echo Enviando para GitHub...
git push

echo.
echo ================================
echo  ATUALIZACAO CONCLUIDA
echo ================================
pause