import path from "path";


const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    mongoose: {
        db: 'mongodb://localhost/music',
    },
    google: {
        clientId: process.env['GOOGLE_CLINT_ID'],
        clientSecret: process.env['GOOGLE_CLINT_SECRET'],
    },
};

export default config;