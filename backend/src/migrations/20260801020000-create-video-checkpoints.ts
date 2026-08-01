import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("video_checkpoints", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      lesson_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "lessons", key: "id" },
        onDelete: "CASCADE",
      },
      timestamp_seconds: { type: DataTypes.INTEGER, allowNull: false },
      question_text: { type: DataTypes.TEXT, allowNull: false },
      question_type: {
        type: DataTypes.ENUM("multiple_choice", "true_false"),
        allowNull: false,
      },
      order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      explanation: { type: DataTypes.TEXT, allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    });

    await queryInterface.addIndex("video_checkpoints", ["lesson_id", "timestamp_seconds"]);

    await queryInterface.createTable("video_checkpoint_answers", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      checkpoint_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "video_checkpoints", key: "id" },
        onDelete: "CASCADE",
      },
      answer_text: { type: DataTypes.STRING, allowNull: false },
      is_correct: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("video_checkpoint_answers");
    await queryInterface.dropTable("video_checkpoints");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_video_checkpoints_question_type";');
  },
};
