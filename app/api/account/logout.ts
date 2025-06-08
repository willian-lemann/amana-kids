import { authClient } from "~/lib/auth-client";

type Input = {
  onSuccess: () => void;
};
export async function logout({ onSuccess }: Input) {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        onSuccess();
      },
    },
  });
}
