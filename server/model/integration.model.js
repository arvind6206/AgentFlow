import mongoose from "mongoose";
import { lowercase } from "zod";

const integrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: {
      type: String,
      required: true,
      enum: ["google", "instagram"],
    },
    services: [
      {
        type: String,
        enum: ["gmail", "google_calender", "instagram"],
      },
    ],

    providerAccounId: {
      type: String,
      required: true,
    },
    account: {
      email: {
        type: String,
        lowercase: true,
        trim: true,
      },
      username: {
        type: String,
        trim: true,
      },

      displayName: {
        type: String,
        trim: true,
      },
    },

    token: {
      accessToken: {
        type: String,
        select: false,
      },
      refreshToken: {
        type: String,
        select: false,
      },
      expiresAt: {
        type: Date,
      },
    },

    scopes: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["connected", "expired", "revoked", "error"],
      default: "connected",
    },

    connectedAt: {
      type: Date,
      default: Date.now,
    },
    lastUsedAt: {
      type: Date,
      default: null,
    },
    metaData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },

  { timestamps: true },
);

export const Integration = mongoose.model("Integration", integrationSchema);
