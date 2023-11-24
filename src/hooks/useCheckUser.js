import userStore from "../stores/userStore";

export const useCheckUser = () => {
  const { user } = userStore();

  return {
    checkUser: (userId) => {
      if (!userId) return false;
      return userId === user?.id || user?.admin;
    },
  };
};
