import styled from "styled-components";

export const ToggleListStyle = styled.section`
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(221, 221, 221);
  padding: 0px 20px;
  background-color: white;
  transition: all 0.5s;
  overflow: hidden;
  font-family: "Lato", sans-serif;
  position: relative;

  .faq__title {
    background-color: white;
    position: relative;
    display: flex;
    transition: all 0.5s;
    padding: 15px 0px;
    cursor: pointer;

    span {
      margin-right: 10px;
    }
    .faq__downArrow {
      position: absolute;
      right: 10px;

      @media (max-width: 705px) {
        right: 0px;
      }

      @media (max-width: 500px) {
        right: -12px;
      }
    }
  }
`;
