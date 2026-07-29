import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export type QuizQuestionType = "multiple_choice" | "true_false" | "short_answer";

export interface QuizQuestionAttributes {
  id: string;
  quizId: string;
  questionText: string;
  questionType: QuizQuestionType;
  points: number;
  order: number;
  explanation: string | null;
  createdAt?: Date;
}

export type QuizQuestionCreationAttributes = Optional<
  QuizQuestionAttributes,
  "id" | "points" | "order" | "explanation" | "createdAt"
>;

export class QuizQuestion
  extends Model<QuizQuestionAttributes, QuizQuestionCreationAttributes>
  implements QuizQuestionAttributes
{
  declare id: string;
  declare quizId: string;
  declare questionText: string;
  declare questionType: QuizQuestionType;
  declare points: number;
  declare order: number;
  declare explanation: string | null;
  declare readonly createdAt: Date;
}

export function initQuizQuestionModel(sequelize: Sequelize) {
  QuizQuestion.init(
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
      questionText: { type: DataTypes.TEXT, allowNull: false, field: "question_text" },
      questionType: {
        type: DataTypes.ENUM("multiple_choice", "true_false", "short_answer"),
        allowNull: false,
        field: "question_type",
      },
      points: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      explanation: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      sequelize,
      modelName: "QuizQuestion",
      tableName: "quiz_questions",
      underscored: true,
      timestamps: true,
      updatedAt: false,
    },
  );

  return QuizQuestion;
}
