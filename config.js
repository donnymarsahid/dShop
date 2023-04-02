/**
 *
 * Configuration for application
 *
 * @param
 */
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

module.exports = {
    dbUrl : process.env.DATABASE_URL_LOCAL || 'mongodb://127.0.0.1:27017/dshop',
    // secret : process.env.SECRET || 'mexWb02isI',
    port : process.env.PORT || 3000,
};
