/**
 * All env variables with default values
 * Don't use default values in production
 */
const {
    HOST: host,
    NODE_ENV: environment = 'development',
    HTTP_PORT: port = '8082',
    DB_HOST: dbHost = 'localhost',
    DB_PORT: dbPort = '5432',
    DB_PASSWORD: dbPassword = 'example',
    DB_USER: dbUser = 'postgres',
    FSYMS: fsyms = 'BTC,ETH',
    TSYMS: tsyms = 'USD,EUR',
} = process.env;

export const configuration = () => ({
    environment,
    server: {
        host,
        port,
    },
    database: {
        type: 'postgres',
        database: 'postgres',
        dropSchema: false,
        // const IS_PRODUCTION = environment === 'production';
        // const entities = [__dirname + `${IS_PRODUCTION ? '/dist/**/*.entity{.ts,.js}' : '/**/*.entity{.ts,.js}'}`];
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        host: dbHost,
        logging: false,
        password: dbPassword,
        port: dbPort,
        username: dbUser,
        synchronize: true,
    },
    priceModule: {
        fsyms,
        tsyms,
    },
});
