import cors from "cors";

function corsOptions() {
  const corsOpt = {
    origin: `${process.env.FRONT_URL}`,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  }
  return cors(corsOpt)
}

export default corsOptions;