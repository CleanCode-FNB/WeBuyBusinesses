import SellForm from "../components/SellForm";
import SellList from "../components/SellList";

const SellPage = () => {
  return (
    <div>
      <h1>Sell Your Business</h1>
      <SellForm onSellAdded={() => window.location.reload()} />
      <SellList />
    </div>
  );
};

export default SellPage;
