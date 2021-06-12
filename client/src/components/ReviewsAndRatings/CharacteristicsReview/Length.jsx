import React, { useState } from 'react';

function Length({ characteristics, styles }) {
  const [recommendProduct, setRecommendProduct] = useState('');
  const value = { Length: recommendProduct };
  console.log(value);

  function changeRecommendedProduct(event) {
    if (event.target.value === '1') {
      setRecommendProduct(1);
    } else if (event.target.value === '2') {
      setRecommendProduct(2);
    } else if (event.target.value === '3') {
      setRecommendProduct(3);
    } else if (event.target.value === '4') {
      setRecommendProduct(4);
    } else if (event.target.value === '5') {
      setRecommendProduct(5);
    }
  }

  if (characteristics.Length !== undefined) {
    return (
      <>
        <styles.header>Length</styles.header>
        <styles.row>
          <styles.label>
            <input
              type="radio"
              id="Length-1"
              name="Length"
              value="1"
              onClick={changeRecommendedProduct}
              required
            />
            Runs Short
          </styles.label>
          <styles.label>
            <input
              type="radio"
              id="Length-2"
              name="Length"
              value="2"
              onClick={changeRecommendedProduct}
              required
            />
            Runs slightly short
          </styles.label>
          <styles.label>
            <input
              type="radio"
              id="Length-3"
              name="Length"
              value="3"
              onClick={changeRecommendedProduct}
              required
            />
            Perfect
          </styles.label>
          <styles.label>
            <input
              type="radio"
              id="Length-4"
              name="Length"
              value="4"
              onClick={changeRecommendedProduct}
              required
            />
            Runs slightly long
          </styles.label>
          <styles.label>
            <input
              type="radio"
              id="Length-5"
              name="Length"
              value="5"
              onClick={changeRecommendedProduct}
              required
            />
            Runs long
          </styles.label>
        </styles.row>
      </>
    );
    // eslint-disable-next-line no-else-return
  } else {
    return null;
  }
}

export default Length;
