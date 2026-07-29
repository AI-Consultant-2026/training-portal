import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export type QuizAttemptStatus = "in_progress" | "submitted" | "graded";

export interface QuizAttemptAttributes {
  id: string;
  quizId: string;
  studentId: string;
  startTime: Date;
  endTime: Date | null;
  score: number | null;
  status: QuizAttemptStatus;
  attemptNumber: number;
}

export type QuizAttemptCreationAttributes = Optional<
  QuizAttemptAttributes,
  "id" | "startTime" | "endTime" | "score" | "status" | "attemptNumber"
>;

export class QuizAttempt
  extends Model<QuizAttemptAttributes, QuizAttemptCreationAttributes>
  implements QuizAttemptAttributes
{
  declare id: string;
  declare quizId: string;
  declare studentId: string;
  declare startTime: Date;
  declare endTime: Date | null;
  declare score: number | null;
  declare status: QuizAttemptStatus;
  declare attemptNumber: number;
}

export function initQuizAttemptModel(sequelize: Sequelize) {
  QuizAttempt.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      quizId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "quiz_id",
        references: { model: "quizzes", key: "id" },
      },
      studentId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "student_id",
        references: { model: "users", key: "id" },
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "start_time",
      },
      endTime: { type: DataTypes.DATE, allowNull: true, field: "end_time" },
      score: { type: DataTypes.INTEGER, allowNull: true },
      status: {
        type: DataTypes.ENUM("in_progress", "submitted", "graded"),
        allowNull: false,
        defaultValue: "in_progress",
      },
      attemptNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: "attempt_number",
      },
    },
    {
      sequelize,
      modelName: "QuizAttempt",
      tableName: "quiz_attempts",
      underscored: true,
      timestamps: false,
    },
  );

  return QuizAttempt;
}
