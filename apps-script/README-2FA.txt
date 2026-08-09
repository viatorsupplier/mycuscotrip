INSTRUCCIONES 2FA GOOGLE APPS SCRIPT

1. Cree un proyecto en script.google.com.
2. Pegue el contenido de Code.gs.
3. Implemente como Web App:
   - Ejecutar como: Yo
   - Acceso: Cualquier usuario
4. Copie la URL que termina en /exec.
5. En index.html, reemplace:
   const GAS_2FA_ENDPOINT = "";
   por:
   const GAS_2FA_ENDPOINT = "URL_DE_SU_WEB_APP";
6. Suba index.html y dashboard.html a GitHub.

Nota: si GAS_2FA_ENDPOINT queda vacío, el login usa modo demo y muestra el código en la consola del navegador.
