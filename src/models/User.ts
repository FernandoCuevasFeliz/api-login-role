import { Schema, model } from 'mongoose';

const userSchema: Schema<IUser> = new Schema(
  {
    firstname: {
      required: true,
      type: String,
      trim: true
    },

    lastname: {
      required: true,
      type: String,
      trim: true
    },

    username: {
      required: true,
      type: String,
      unique: true,
      trim: true
    },

    email: {
      type: String,
      unique: true,
      trim: true
    },

    password: {
      type: String,
      trim: true
    },

    image: { type: String, trim: true },

    confirmAccount: {
      type: Boolean,
      default: false
    },
    stateUser: {
      type: String,
      trim: true
    },

    googleId: {
      type: String,
      trim: false,
      unique: true
    },

    facebookId: {
      type: String,
      trim: true,
      unique: true
    },

    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'roles'
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model<IUser>('user', userSchema);
