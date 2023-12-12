import { connect, ConnectionOptions } from 'mongoose';

const dbUri = 'mongodb://127.0.0.1:27017/inspirarte3';

const dbOptions: ConnectionOptions & { useUnifiedTopology?: boolean } = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

export async function startConnection() {
    try {
        await connect(dbUri, dbOptions);
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        throw error;
    }
}
