import { authenticated } from "./authenticated";
import { onboarding } from "./onboarding";

const middlewares = {
  authenticated,
  onboarding,
};
export type Middlewares = typeof middlewares;

export { middlewares };
