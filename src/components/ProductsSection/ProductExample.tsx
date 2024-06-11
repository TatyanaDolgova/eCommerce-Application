import { Link } from 'react-router-dom';

interface ProductExampleCardProps {
  imageURL: string;
  productDescription: string;
  productName: string;
}

const ProductExampleCard = (props: ProductExampleCardProps) => {
  return (
    <div className="product_example_card">
      <img
        className="product_example_image"
        src={props.imageURL}
        alt={props.productName}
      />
      <div className="product_example_info">
        <h3>{props.productName}</h3>
        <p>{props.productDescription}</p>
        <Link to="/catalog">See more on the catalog page!</Link>
      </div>
    </div>
  );
};

export default ProductExampleCard;
