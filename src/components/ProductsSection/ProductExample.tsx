import { Link } from 'react-router-dom';

interface ProductExampleCardProps {
  imageURL: string;
  productDescription: string;
  productID: string;
  productName: string;
  productSlug: string;
}

const ProductExampleCard = (props: ProductExampleCardProps) => {
  return (
    <Link
      className="product_example_card"
      to={`/catalog/${props.productSlug}`}
      state={props.productID}
    >
      <img
        className="product_example_image"
        src={props.imageURL}
        alt={props.productName}
      />
      <div className="product_example_info">
        <h3 className="product_example_title">{props.productName}</h3>
        <p>{props.productDescription}</p>
      </div>
    </Link>
  );
};

export default ProductExampleCard;
