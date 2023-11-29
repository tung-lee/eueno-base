import { BufferData, UploadType, UploadUrl, createProject, login, uploadFile } from "@eueno/lib-browser";
import { oraiGetSigningClient } from "./helper";
import { toast } from "react-toastify";

export interface UploadOptions {
  file: File;
  path: string[]; // Path file
  projectId: string;
  uploadType: UploadType;
  inFolder: boolean;
  exportedKey?: string; // Need if encrypt
  onUploadProgress: () => void; // Progress upload file,
  account: string;
}

export interface UploadFileOptions extends UploadOptions {
  uploadUrl?: UploadUrl; // must be ignored when upload single file
  callback?: (bufferData: BufferData, webseed: string[], account: string) => void; // callback must be ignored when upload single file
}

export const euenoLogin = async (): Promise<string> => {
  const response = await login(process.env.NEXT_PUBLIC_BACKEND_URL!);
  return response.data.data.token;
};

export const euenoCreateProject = async ({ name }: { name: string }): Promise<string> => {
  const token = await euenoLogin();
  const response = await createProject(
    {
      name,
    },
    token
  );
  return response.data.data.id;
};

export const euenoUploadFile = async ({ file, projectId }: { file: File; projectId: string }): Promise<string> => {
  const { account } = await oraiGetSigningClient();
  const token = await euenoLogin();
  const response = await uploadFile(token, "HomeLab.ai", {
    projectId,
    file,
    path: [projectId],
    uploadType: "UNENCRYPTED",
    inFolder: false,
    account: account.address,
    onUploadProgress: () => {
      toast.info("Đang tải file lên EUENO");
    },
  });
  return response.data.data.id;
};
