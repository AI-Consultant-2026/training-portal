import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface CourseFeedbackAttributes {
  id: string;
  enrollmentId: string;
  studentId: string;
  courseId: string;
  rating: number;
  comment: string;
  consentQuote: boolean;
  consentCapstone: boolean;
  approved: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CourseFeedbackCreationAttributes = Optional<
  CourseFeedbackAttributes,
  "id" | "consentQuote" | "consentCapstone" | "approved" | "createdAt" | "updatedAt"
>;

export class CourseFeedback
  extends Model<CourseFeedbackAttributes, CourseFeedbackCreationAttributes>
  implements CourseFeedbackAttributes
{
  declare id: string;
  declare enrollmentId: string;
  declare studentId: string;
  declare courseId: string;
  declare rating: number;
  declare comment: string;
  declare consentQuote: boolean;
  declare consentCapstone: boolean;
  declare approved: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initCourseFeedbackModel(sequelize: Sequelize) {
  CourseFeedback.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      enrollmentId: { type: DataTypes.UUID, allowNull: false, unique: true },
      studentId: { type: DataTypes.UUID, allowNull: false },
      courseId: { type: DataTypes.UUID, allowNull: false },
      rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
      comment: { type: DataTypes.TEXT, allowNull: false },
      consentQuote: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      consentCapstone: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      approved: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    },
    { sequelize, modelName: "CourseFeedback", tableName: "course_feedback", underscored: true, timestamps: true },
  );
  return CourseFeedback;
}
