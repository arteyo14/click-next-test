import { useActionStore } from "~~/core/shared/store/ActionStore";

const useAction = (actions: any) => {
  const actionStore = useActionStore();
  return actionStore.setActions(actions);
};

export default useAction;
