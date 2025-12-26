import { ConnectClient } from "@aws-sdk/client-connect";
import dotenv from "dotenv";
dotenv.config();

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const sessionToken = process.env.AWS_SESSION_TOKEN;

if (!accessKeyId || !secretAccessKey) {
  throw new Error(
    "AWS credentials are required: AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set",
  );
}

const credentials: any = {
  accessKeyId,
  secretAccessKey,
};

if (sessionToken) {
  credentials.sessionToken = sessionToken;
}

const client = new ConnectClient({
  region: "us-east-1",
  credentials,
});

export default client;
