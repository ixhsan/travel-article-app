import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { notify } from "./notify";
import { isAxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (err) => {
        if (isAxiosError(err)) {
          notify.error(err.response?.data?.message || "Mutation failed");
          return;
        }
        notify.error(err.message || "Mutation failed");
      },

      onSuccess: (data) => {
        notify.success(data.message || "Operation Success");
      },
    },
  },
});

export const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});
