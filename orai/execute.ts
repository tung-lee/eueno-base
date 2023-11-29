import { oraiGetSigningClient } from "./helper";

export const oraiCreateJob = async (jobData: CreateJobData): Promise<string> => {
  const { signingClient, account } = await oraiGetSigningClient();
  const executeRes = await signingClient.execute(
    account.address,
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
    {
      create_new_job: jobData,
    },
    "auto"
  );
  return executeRes.transactionHash;
};

export const oraiAcceptJob = async (jobId: string): Promise<string> => {
  const { signingClient, account } = await oraiGetSigningClient();
  const executeRes = await signingClient.execute(
    account.address,
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
    {
      accept_job: {
        job_id: jobId,
      },
    },
    "auto"
  );
  return executeRes.transactionHash;
};
