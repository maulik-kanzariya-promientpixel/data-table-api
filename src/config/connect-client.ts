import { ConnectClient } from "@aws-sdk/client-connect";

const client = new ConnectClient({
  region:
    process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "us-east-1",
});

export default client;
