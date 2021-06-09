import React from 'react';

function Quality(props) {
  if (props.characteristics.Quality !== undefined) {
    return (
      <div>
        <props.styles.title>Quality</props.styles.title>
        <props.styles.slider
          type="range"
          min="1"
          max="5"
          value={props.characteristics.Quality.value}
          readonly="readonly"
          step="0.01"
        />
        <props.styles.text>
          <props.styles.labels>Poor</props.styles.labels>
          <props.styles.labels>Perfect</props.styles.labels>
        </props.styles.text>
      </div>
    );
  } else {
    return null;
  }
}

export default Quality;
