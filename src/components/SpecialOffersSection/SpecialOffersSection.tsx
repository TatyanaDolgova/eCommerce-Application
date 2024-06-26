import './SpecialOffersSection.css';

interface CopyButtonProps {
  value: string;
}

const SpecialOffersSection = () => {
  const copyText = async (value: string) => {
    await navigator.clipboard.writeText(value);
  };

  const CopyButton = ({ value }: CopyButtonProps) => {
    return (
      <button
        type="button"
        className="button copy-button"
        onClick={async () => {
          await copyText(value);
        }}
        data-value={value}
      />
    );
  };

  return (
    <section className="special-offer_section">
      <h2 className="special-offer_h2">Our Special Offers</h2>
      <div className="special-offer_container">
        <div className="offers-container">
          <div className="offer">
            <p>Get 3 Euros OFF your first order above 10 Euros</p>
            <div className="code-container">
              <p>
                Discount code: <span className="red">FIRSTORDER</span>
              </p>
              <CopyButton value="FIRSTORDER" />
            </div>
          </div>
          <div className="offer">
            <p>Get 1 Euro OFF any order above 5 Euros before 31/08</p>
            <div className="code-container">
              <p>
                Discount code: <span className="red">SUMMERSALE</span>
              </p>
              <CopyButton value="SUMMERSALE" />
            </div>
          </div>
          <div className="offer">
            <p>Get 15% OFF your order above 100 Euros</p>
            <div className="code-container">
              <p>
                Discount code: <span className="red">WHOLESALE</span>
              </p>
              <CopyButton value="WHOLESALE" />
            </div>
          </div>
        </div>
        <div className="special-offer_img-container">
          <img
            className="special-offer_img"
            src="https://raw.githubusercontent.com/belosnezhie/eCommerce-Application-data/main/images/Plant-sets/Baby_Caladium.jpg"
            alt="Pink Calladium Set"
          />
        </div>
      </div>
    </section>
  );
};

export default SpecialOffersSection;
