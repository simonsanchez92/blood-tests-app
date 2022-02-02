import { connect } from "mongoose";

class DB {
  async connectDB(): Promise<void> {
    try {
      const MONGO_URI = process.env.MONGO_URI!;

      const conn = await connect(MONGO_URI);
      console.log(`Mongo DB Connected: ${conn.connection.host}`);
    } catch (e) {
      console.error("", e as Error);
      process.exit(1);
    }
  }
}

export const db = new DB();
