import { oraiGetSigningClient } from "./helper";

export const oraiGetLastJobId = async (): Promise<string> => {
  const { signingClient } = await oraiGetSigningClient();
  const queryRes = await signingClient.queryContractSmart(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, {
    get_last_job_id: {},
  });
  return queryRes.last_job_id;
};

export const oraiGetDepositFeePercentId = async (): Promise<string> => {
  const { signingClient } = await oraiGetSigningClient();
  const queryRes = await signingClient.queryContractSmart(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, {
    get_deposit_fee_percent: {},
  });
  return queryRes.deposit_fee_percent;
};

export const oraiGetJobId = async (jobId: string): Promise<Job> => {
  const { signingClient } = await oraiGetSigningClient();
  const queryRes = await signingClient.queryContractSmart(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, {
    get_job: {
      job_id: jobId,
    },
  });
  return queryRes.job;
};
