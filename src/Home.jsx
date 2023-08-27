import { useGlobalContext } from "./Context";
import MainPage from "./MainPage";

const Home = () => {
  const { dark } = useGlobalContext();
  return (
    <div className={`${dark ? "main dark-main" : "main "}`}>
      <MainPage />
    </div>
  );
};

export default Home;
