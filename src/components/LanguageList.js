import React from "react";
import styled from "styled-components";

function LanguageList() {
  return (
    <LanguageListContainer>
      <button>Spring</button>
      <button>React</button>
      <button>Node.js</button>
    </LanguageListContainer>
  );
}

export default LanguageList;

const LanguageListContainer = styled.div`
  background-color: yellow;
  display: flex;
  justify-content: space-between;
`;
