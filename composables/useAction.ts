import { useActionStore } from "~~/core/shared/store/ActionStore";
import { useNuxtApp } from "#app";

const useAction = (actions: any) => {
  const nuxtApp = useNuxtApp();
  const actionStore = nuxtApp.$pinia ? useActionStore() : null;

  if (actionStore) {
    return actionStore.setActions(actions);
  } else {
    console.warn("Pinia is not initialized yet.");
    return;
  }
};

export default useAction;
