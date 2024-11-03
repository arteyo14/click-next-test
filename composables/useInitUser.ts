import { useInitUserStore } from "~/core/modules/initUser/store";

const useInitUser = () => {
  const store = useInitUserStore();
  return store.user;
};

export default useInitUser;
