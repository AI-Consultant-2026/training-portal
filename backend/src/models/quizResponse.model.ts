import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface QuizResponseAttributes {
  id: string;
  attemptId: string;
  questionId: string;
  studentAnswer: string;
  isCorrect: boolean | null;
  pointsEarned: number | null;
  markedAt: Date | null;
}

export type QuizResponseCreationAttributes = Optional<
  QuizResponseAttributes,
  "id" | "isCorrect" | "pointsEarned" | "markedAt"
>;

export class QuizResponse
  extends Model<QuizResponseAttributes, QuizResponseCreationAttributes>
  implements QuizResponseAttributes
{
  declare id: string;
  declare attemptId: string;
  declare questionId: string;
  declare studentAnswer: string;
  declare isCorrect: boolean | null;
  declare pointsEarned: number | null;
  declare markedAt: Date | null;
}

export function initQuizResponseModel(sequelize: Sequelize) {
  QuizResponse.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      attemptId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "attempt_id",
        references: { model: "quiz_attempts", key: "id" },
      },
      questionId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "question_id",
        references: { model: "quiz_questions", key: "id" },
      },
      studentAnswer: { type: DataTypes.TEXT, allowNull: false, field: "student_answer" },
      isCorrect: { type: DataTypes.BOOLEAN, allowNull: true, field: "is_correct" },
      pointsEarned: { type: DataTypes.INTEGER, allowNull: true, field: "points_earned" },
      markedAt: { type: DataTypes.DATE, allowNull: true, field: "marked_at" },
    },
    {
      sequelize,
      modelName: "QuizResponse",
      tableName: "quiz_responses",
      underscored: true,
      timestamps: false,
    },
  );

  return QuizResponse;
}
