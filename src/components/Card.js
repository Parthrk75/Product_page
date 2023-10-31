import { BsFillBagFill } from "react-icons/bs";

const Card = ({ img, title, star, reviews, prevPrice, newPrice }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={img} alt={title} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Some product description here</p>
        <div className="card-reviews">
          {star} {star} {star} {star}
          <span className="total-reviews">{reviews} reviews</span>
        </div>
        <div className="card-price">
          <div className="price">
            <del>{prevPrice}</del> {newPrice}
          </div>
          <div className="bag">
            <BsFillBagFill className="bag-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
