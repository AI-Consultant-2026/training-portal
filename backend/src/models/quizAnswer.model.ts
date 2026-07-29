import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface QuizAnswerAttributes {
  id: string;
  questionId: string;
  answerText: string;
  isCorrect: boolean;
  order: number;
}

export type QuizAnswerCreationAttributes = Optional<QuizAnswerAttributes, "id" | "isCorrect" | "order">;

export class QuizAnswer
  extends Model<QuizAnswerAttributes, QuizAnswerCreationAttributes>
  implements QuizAnswerAttributes
{
  declare id: string;
  declare questionId: string;
  declare answerText: string;
  declare isCorrect: boolean;
  declare order: number;
}

export function initQuizAnswerModel(sequelize: Sequelize) {
  QuizAnswer.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      questionId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "question_id",
        references: { model: "quiz_questions", key: "id" },
      },
      answerText: { type: DataTypes.STRING, allowNull: false, field: "answer_text" },
      isCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_correct",
      },
      order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: "QuizAnswer",
      tableName: "quiz_answers",
      underscored: true,
      timestamps: false,
    },
  );

  return QuizAnswer;
}
