import app from './app';
import { startConnection } from './database';

async function main() {
    try {
        await startConnection();
        app.listen(app.get('port'), () => {
            console.log('Servidor corriendo en el puerto', app.get('port'));
        });
    } catch (error) {
        console.error('Error al iniciar la aplicación:', error);
    }
}

main();
