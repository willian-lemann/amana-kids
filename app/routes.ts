import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/auth/protected.tsx", [route("/", "routes/home.tsx")]),

  layout("routes/auth/guest.tsx", [
    route("/login", "routes/auth/login.tsx"),
    route("/signup", "routes/auth/signup.tsx"),
  ]),

  layout("routes/auth/onboarding.tsx", [
    route("/onboarding", "routes/onboarding.tsx"),
  ]),

  route("/api/auth/*", "routes/auth/api.auth.$.ts"),
] satisfies RouteConfig;
