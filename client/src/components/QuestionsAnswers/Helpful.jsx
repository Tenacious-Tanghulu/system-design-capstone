import React, { useState } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
font-family: 'Helvetica', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif, Helvetica, sans-serif;
background: white;
border: none;
font-size: 11px;
font-weight: 100;
&:hover ${StyledButton} {
  text-decoration: underline;
  color: #C50000;
`;

const HelpfulStyle = styled.span`
font-family: 'Helvetica', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif, Helvetica, sans-serif;
cursor: pointer;
font-size: 11px;
font-weight: 100;
`;

const Helpful = ({ help }) => {
  const [count, setCount] = useState(help);
  return (
    <div>
      <HelpfulStyle>
        Helpful?
        <StyledButton type="button" onClick={() => setCount(count + 1)}>Yes</StyledButton>

        <span>
          (
          <span>{count}</span>
          )
        </span>
      </HelpfulStyle>
      &nbsp;&nbsp;&nbsp; | &nbsp;
    </div>
  );
};

export default Helpful;
