exports.up = async function up(queryInterface, Sequelize) {
  try {
    // Console log
    console.log("Creating user table");

    // Defining whether the user table already exist or not.
    const stateTableExists = await queryInterface.tableExists("user");

    // Condition for creating the user table only if the table doesn't exist already.
    if (!stateTableExists) {
      await queryInterface.createTable("user", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        session_id: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: true,
          type: Sequelize.DATE,
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE,
        },
      });
    };
  } catch (err) {
    console.log(err);
  };
};

exports.down = async function down(queryInterface) {
  try {
    const stateTableExists = await queryInterface.tableExists("user");

    if (stateTableExists) {
      await queryInterface.dropTable("user");
    };
  } catch (err) {
    console.log(err);
  };
};
