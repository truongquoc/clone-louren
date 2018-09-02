module.exports = {
    port: process.env.APP_PORT,
    dbUrl: process.env.DB_CONNECTION,
    sessionLifetime: process.env.SESSION_LIFETIME,
    jwtSecret: process.env.JWT_SECRET,
};
