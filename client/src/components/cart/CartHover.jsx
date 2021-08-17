import React, { useContext } from "react";

import { ProductContext } from "../../contexts/ProductContext";
import { CartContext } from "../../contexts/CartContext";

import { Button } from "react-bootstrap";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";

import "../../css/CartHover.css";

const useStyles = makeStyles(() => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    pointerEvents: "auto",
  },
}));

const CartHover = () => {
  const { openedPopover, setOpenedPopover, popoverAnchor } =
    useContext(ProductContext);
  const { itemCart } = useContext(CartContext);

  const classes = useStyles();

  const totalPrice = itemCart.reduce(
    (sum, { price, totalItem }) => sum + price * totalItem,
    0
  );

  const handleShowPopover = () => setOpenedPopover(true);
  const handleHidePopover = () => setOpenedPopover(false);

  return (
    <Popover
      id="mouse-over-popover"
      className={classes.popover}
      classes={{
        paper: classes.paper,
      }}
      open={openedPopover}
      anchorEl={popoverAnchor.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      PaperProps={{
        onMouseEnter: handleShowPopover,
        onMouseLeave: handleHidePopover,
      }}
      marginThreshold={50}
      disableRestoreFocus
    >
      <div className="popover-cart">
        {itemCart.map((item, index) => (
          <div key={index} className="popover-item">
            <img src={item.url} alt="" />
            <div className="item-information">
              <h5>{item.title}</h5>
              <p className="price-information">${item.price}</p>
              <div className="item-information-child">
                <p>{item.totalItem}</p>
                <p>{item.size}</p>
                <p>{item.color}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="footer-popover">
        <Button>View Cart</Button>
        <div className="total-price">
          total price: <strong>${totalPrice}</strong>
        </div>
      </div>
    </Popover>
  );
};

export default CartHover;
