import cors from "cors";

export const corsMiddleware = (aceptedOrigins) => {
  if (!aceptedOrigins) {
    return cors();
  }

  const corsOptions = {
    origin: (origin, callback) => {
      if (aceptedOrigins.indexOf(origin) !== -1 || !origin) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  };

  return cors(corsOptions);
};
