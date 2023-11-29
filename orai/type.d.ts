type Job = {
  owner: string;
  worker: string;
  description: string;
  commitment: string;
  total_price: string;
};

type CreateJobData = { worker: string; description: string; commitment: string; total_price: string };
