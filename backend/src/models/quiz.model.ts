import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface QuizAttributes {
  id: string;
  moduleId: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  timeLimitMinutes: number | null;
  passingScore: number;
  questionCount: number;
  shuffleQuestions: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type QuizCreationAttributes = Optional<
  QuizAttributes,
  "id" | "description" | "dueDate" | "timeLimitMinutes" | "shuffleQuestions" | "createdAt" | "updatedAt"
>;

export class Quiz extends Model<QuizAttributes, QuizCreationAttributes> implements QuizAttributes {
  declare id: string;
  declare moduleId: string;
  declare title: string;
  declare description: string | null;
  declare dueDate: Date | null;
  declare timeLimitMinutes: number | null;
  declare passingScore: number;
  declare questionCount: number;
  declare shuffleQuestions: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initQuizModel(sequelize: Sequelize) {
  Quiz.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      moduleId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "module_id",
        references: { model: "modules", key: "id" },
      },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      dueDate: { type: DataTypes.DATE, allowNull: true, field: "due_date" },
      timeLimitMinutes: { type: DataTypes.INTEGER, allowNull: true, field: "time_limit_minutes" },
      passingScore: { type: DataTypes.INTEGER, allowNull: false, field: "passing_score" },
      questionCount: { type: DataTypes.INTEGER, allowNull: false, field: "question_count" },
      shuffleQuestions: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "shuffle_questions",
      },
    },
    {
      sequelize,
      modelName: "Quiz",
      tableName: "quizzes",
      underscored: true,
      timestamps: true,
    },
  );

  return Quiz;
}
