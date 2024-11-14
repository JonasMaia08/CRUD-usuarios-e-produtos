import { useNavigate } from "react-router-dom";

const useNavigateTo = () => {
  const adress = useNavigate();

  const goTo = (path: string): void => {
    adress(path);
  };

  return goTo;
};

export default useNavigateTo;