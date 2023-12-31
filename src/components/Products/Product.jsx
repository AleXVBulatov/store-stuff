import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "../../styles/Product.module.css";
import { ROUTES } from "../../utils/routes.js";
import { addItemToCart } from "../../redux/user/userSlice";

const SIZES = [4, 4.5, 5];

const Product = (props) => {
  const { images, title, price, description } = props;
  // const currentImage = images[0];

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItemToCart(props));
  };

  const [currentImage, setCurrentImage] = useState();
  const [currentSize, setCurrentSize] = useState();
  // const [cart, setCart] = useState({});

  useEffect(() => {
    if (!images.length) return;
    setCurrentImage(images[0]);
  }, [images]);

  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div className={styles.current} style={{ backgroundImage: `url(${currentImage})` }} />
        <div className={styles["images-list"]}>
          {images.map((image, i) => {
            return (
              <div
                key={i}
                className={styles.image}
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => {
                  setCurrentImage(image);
                }}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>${price}</div>
        <div className={styles.color}>
          <span>Color: </span>Green
        </div>
        <div className={styles.sizes}>
          <span>Sizes: </span>
          <div className={styles.list}>
            {SIZES.map((size) => {
              return (
                <div
                  onClick={() => setCurrentSize(size)}
                  key={size}
                  className={`${styles.size} ${currentSize === size ? `${styles.active}` : ""}`}
                >
                  {size}
                </div>
              );
            })}
          </div>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <button className={styles.add} disabled={!currentSize} onClick={addToCart}>
            Add to cart
          </button>
          <button className={styles.favourite}>Add to favourite</button>
        </div>
        <div className={styles.bottom}>
          <div className={styles.purchase}>19 people purchased</div>
          <Link to={ROUTES.HOME}>Return to store</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
