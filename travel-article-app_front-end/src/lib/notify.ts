import { toast } from "sonner";

export const notify = {
  success: (msg: string, desc?: string) =>
    toast.success(msg, { description: desc }),
  error: (msg: string, desc?: string) =>
    toast.error(msg, { description: desc }),
  info: (msg: string, desc?: string) => toast.info(msg, { description: desc }),
  warning: (msg: string, desc?: string) =>
    toast.warning(msg, { description: desc }),
};
