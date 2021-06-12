import React from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';

const Reviews = styled.div`
display: flex;
flex-direction: column;
`;

const Row = styled.div`
display: flex;
flex-direction: row;
`;

const AverageRating = styled.span`
font-family: 'Helvetica', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif, Helvetica, sans-serif;
font-size: 5vw;
font-weight: bold;
`;

const TextStyle = styled.span`
font-family: 'Helvetica', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif, Helvetica, sans-serif;
font-size: 1.75vw;
display: flex;
flex-direction: row;
`;

const TextStyle2 = styled.span`
font-family: 'Helvetica', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif, Helvetica, sans-serif;
font-size: 1.75vw;
`;

const StarRating = styled.span`
margin: 0.75vw 0 0.75vw 0;
`;

const StarRow = styled.span`
display: flex;
flex-direction: row;
text-decoration: underline;
line-height: 1.6;
&:hover {
  color: green;
}
`;

const Progress = styled.progress`
-webkit-appearance: none;
width: 26.5vw;
height: 1vw;
margin: 1vw 0 0 0.5vw;
&::-webkit-progress-bar {
  background-color: #eee;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0) inset;
}
`;

function Rating( {totalNumReviews, recommended, ratings,averageRating} ) {
  return (
    <>
      <Reviews>
        <Row>
          <AverageRating>{averageRating}</AverageRating>
          <StarRatings
            rating={averageRating}
            starDimension="1.5vw"
            starSpacing="0px"
            starRatedColor="black"
            numberOfStars={5}
            name="rating"
          />
        </Row>
        <TextStyle2>
          {Math.round((recommended / totalNumReviews) * 100)}
          % of reviews recommend this product
        </TextStyle2>
        <StarRating>
          <StarRow>
            <TextStyle>
              5&#160;‏‏‎stars
              <Progress
                value={ratings['5'] || '0'}
                max={totalNumReviews || '0'}
              />
            </TextStyle>
          </StarRow>
          <StarRow>
            <TextStyle>
              4&#160;stars
              <Progress
                value={ratings['4'] || '0'}
                max={totalNumReviews}
              />
            </TextStyle>
          </StarRow>
          <StarRow>
            <TextStyle>
              3&#160;stars
              <Progress
                value={ratings['3'] || '0'}
                max={totalNumReviews}
              />
            </TextStyle>
          </StarRow>
          <StarRow>
            <TextStyle>
              2&#160;stars
              <Progress
                value={ratings['2'] || '0'}
                max={totalNumReviews}
              />
            </TextStyle>
          </StarRow>
          <StarRow>
            <TextStyle>
              1&#160;stars
              <Progress
                value={ratings['1'] || '0'}
                max={totalNumReviews}
              />
            </TextStyle>
          </StarRow>
        </StarRating>
      </Reviews>
    </>
  );
}

export default Rating;
