import { Schema, model } from 'mongoose';

const roleSchema: Schema<IRole> = new Schema(
  {
    name: {
      type: String,
      trim: true
    },

    description: {
      type: String,
      trim: true
    }
  },
  { timestamps: true, versionKey: false }
);

export default model<IRole>('role', roleSchema);
