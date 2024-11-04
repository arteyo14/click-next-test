import { useInitUserStore } from "~/core/modules/initUser/store";

const useInitUser = () => {
  const store = useInitUserStore();
  return store.getUser;
};

export default useInitUser;
