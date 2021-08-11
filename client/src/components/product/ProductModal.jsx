import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import Slider from "react-slick";

const ProductModal = ({ product: { title, description, price } }) => {
  const [defaultSelect, setDefaultSelect] = useState("DEFAULT");
  const [defaultSelect2, setDefaultSelect2] = useState("DEFAULT");
  const [quantity, setQuantity] = useState(1);
  const [animate, setAnimate] = useState("animate__fadeInDown");

  const { cart, setCart } = useContext(ProductContext);

  const regex = /^[0-9\b]+$/;

  const styled = { width: "550px", height: "650px" };
  const modal = document.getElementById("myModal");

  const handleChange = (e) => setDefaultSelect(e.target.value);
  const handleChange2 = (e) => setDefaultSelect2(e.target.value);

  const handleIncrease = () => setQuantity(parseInt(quantity + 1));
  const handleDecrease = () =>
    quantity === typeof String
      ? setQuantity(1)
      : quantity <= 1
      ? setQuantity(1)
      : setQuantity(quantity - 1);
  const handleChangeInput = (e) => {
    let input = e.target.value;
    if (!regex.test(input)) return;
    setQuantity(parseInt(input));
  };

  const settings = {
    arrows: false,
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const handleClose = () => {
    setAnimate("animate__fadeOut");
    setTimeout(() => {
      modal.style.display = "none";
      setDefaultSelect("DEFAULT");
      setDefaultSelect2("DEFAULT");
      setQuantity(1);
      setAnimate("animate__fadeInDown");
    }, 400);
  };

  const handleAddToCart = () => {
    setCart(cart + 1);
    handleClose();
  };

  window.onclick = (e) => (e.target === modal ? handleClose() : null);

  return (
    <div id="myModal" className={"modal animate__animated " + animate}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <div className="container-content">
          <div className="container-slider">
            <Slider {...settings}>
              <div>
                <img
                  style={styled}
                  alt=""
                  src={
                    "https://preview.colorlib.com/theme/cozastore/images/xproduct-detail-01.jpg.pagespeed.ic.p3moSJxG7I.webp"
                  }
                />
              </div>
              <div>
                <img
                  style={styled}
                  alt=""
                  src={
                    "https://preview.colorlib.com/theme/cozastore/images/xproduct-detail-02.jpg.pagespeed.ic.1bDtXoN8v6.webp"
                  }
                />
              </div>
              <div>
                <img
                  style={styled}
                  alt=""
                  src={
                    "https://preview.colorlib.com/theme/cozastore/images/xproduct-detail-03.jpg.pagespeed.ic.-rPS2k8YRO.webp"
                  }
                />
              </div>
            </Slider>
          </div>
          <div className="container-information">
            <h2 className="information-title">{title}</h2>
            <strong>${price}</strong>
            <p> {description} </p>
            <div className="information-size">
              <span>Size</span>
              <select
                className="form-select"
                aria-label="Default select example"
                value={defaultSelect}
                onChange={handleChange}
              >
                <option value="DEFAULT" disabled>
                  Choose
                </option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div className="information-color">
              <span>Color</span>
              <select
                className="form-select"
                aria-label="Default select example"
                value={defaultSelect2}
                onChange={handleChange2}
              >
                <option value="DEFAULT" disabled>
                  Choose
                </option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Yellow">Yellow</option>
                <option value="Pink">Pink</option>
              </select>
            </div>
            <div className="information-quantity">
              <span>Quantity</span>
              <div className="quantity-btn">
                <div
                  className="decrease-btn"
                  onClick={handleDecrease}
                  style={{ userSelect: "none" }}
                >
                  -
                </div>
                <input
                  className="quantity-show"
                  value={quantity}
                  onClick={() => setQuantity("")}
                  onChange={handleChangeInput}
                />
                <div
                  className="increase-btn"
                  onClick={handleIncrease}
                  style={{ userSelect: "none" }}
                >
                  +
                </div>
              </div>
            </div>
            <div className="container-button">
              <button onClick={handleAddToCart}>ADD TO CART</button>
              <i className="fas fa-heart"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
