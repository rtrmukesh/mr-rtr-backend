// const Sequelize = require("sequelize");
// require("dotenv").config();

// // Check if DATABASE_URL exists, if so use it; otherwise, fall back to individual environment variables
// const db = process.env.DATABASE_URL
//   ? new Sequelize(process.env.DATABASE_URL, {
//       dialect: 'postgres',
//       dialectOptions: {
//         ssl: {
//           require: true,
//           rejectUnauthorized: false, // SSL configurations
//         },
//       },
//     })
//   : new Sequelize(
//       process.env.DB_NAME || 'defaultDatabase',  // Fallback database name
//       process.env.DB_USER || 'defaultUser',      // Fallback username
//       process.env.DB_PASSWORD || 'defaultPassword', // Fallback password
//       {
//         host: process.env.DB_HOST || 'localhost', // Fallback host
//         dialect: process.env.DB_DIALECT || 'postgres', // Fallback dialect
//         port: process.env.DB_PORT || 5432,        // Fallback port
//         dialectOptions: {
//           ssl: {
//             require: true,
//             rejectUnauthorized: false, // SSL configurations
//           },
//         },
//       }
//     );

// module.exports = db;
