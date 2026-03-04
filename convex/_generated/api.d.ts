/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as activityLog from "../activityLog.js";
import type * as auth from "../auth.js";
import type * as banners from "../banners.js";
import type * as brands from "../brands.js";
import type * as categories from "../categories.js";
import type * as howItWorksSteps from "../howItWorksSteps.js";
import type * as portfolio from "../portfolio.js";
import type * as products from "../products.js";
import type * as reviews from "../reviews.js";
import type * as seed from "../seed.js";
import type * as services from "../services.js";
import type * as settings from "../settings.js";
import type * as storage from "../storage.js";
import type * as trustItems from "../trustItems.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  activityLog: typeof activityLog;
  auth: typeof auth;
  banners: typeof banners;
  brands: typeof brands;
  categories: typeof categories;
  howItWorksSteps: typeof howItWorksSteps;
  portfolio: typeof portfolio;
  products: typeof products;
  reviews: typeof reviews;
  seed: typeof seed;
  services: typeof services;
  settings: typeof settings;
  storage: typeof storage;
  trustItems: typeof trustItems;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
