import { useInitUserStore } from "~/core/modules/initUser/store";

const store = useInitUserStore();

const useInitUser = () => {
  return store.user;
};

export default useInitUser;
