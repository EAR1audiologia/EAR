const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);

function isEnabledFlag(value: string | undefined) {
  return TRUE_VALUES.has((value ?? "").trim().toLowerCase());
}

export type CookiebotEnvironment = "production" | "preview" | "local";

export type CookiebotRuntime = {
  cbid: string;
  environment: CookiebotEnvironment;
  enabled: boolean;
  shouldRenderDeclaration: boolean;
};

export function getCookiebotRuntime(): CookiebotRuntime {
  const cbid = (process.env.NEXT_PUBLIC_COOKIEBOT_ID ?? "").trim();
  const vercelEnv = (process.env.VERCEL_ENV ?? "").trim().toLowerCase();
  const nodeEnv = (process.env.NODE_ENV ?? "").trim().toLowerCase();

  let environment: CookiebotEnvironment = "local";

  if (vercelEnv === "production" || (nodeEnv === "production" && !vercelEnv)) {
    environment = "production";
  } else if (vercelEnv === "preview") {
    environment = "preview";
  }

  const previewEnabled = isEnabledFlag(
    process.env.NEXT_PUBLIC_ENABLE_COOKIEBOT_IN_PREVIEW
  );
  const localEnabled = isEnabledFlag(
    process.env.NEXT_PUBLIC_ENABLE_COOKIEBOT_LOCALLY
  );

  const enabled =
    cbid.length > 0 &&
    (environment === "production" ||
      (environment === "preview" && previewEnabled) ||
      (environment === "local" && localEnabled));

  return {
    cbid,
    environment,
    enabled,
    shouldRenderDeclaration: environment === "production" && cbid.length > 0,
  };
}
