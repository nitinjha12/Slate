import styled from "styled-components";

export const ToggleListStyle = styled.section`
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(221, 221, 221);
  padding: 0px 20px;
  background-color: white;
  transition: all 0.5s;
  /* overflow: hidden; */
  border-radius: 4px;
  font-family: "Lato", sans-serif;
  position: relative;

  &.dark {
    background-color: #222;
    color: white;

    textarea {
      background-color: #222;
      color: white;
    }

    .toggleList__title {
      background-color: #222;
    }

    .toggleList__remove {
      &:hover {
        background-color: rgb(53, 53, 53);
      }
      &:active {
        background-color: rgb(33, 33, 33);
      }
    }

    .toggleList__downArrow {
      &:hover {
        background-color: rgb(53, 53, 53) !important;
      }
      &:active {
        background-color: rgb(33, 33, 33) !important;
      }
    }
  }

  .toggleList__title {
    background-color: white;
    position: relative;
    display: flex;
    transition: all 0.5s;

    .toggleList__downArrow {
      position: absolute;
      left: -15px;
      top: 5px;
      cursor: pointer;

      &:hover {
        background-color: rgb(233, 233, 233);
        border-radius: 5px;
      }
      &:active {
        background-color: rgb(211, 211, 211);
        border-radius: 5px;
      }
    }
  }

  .toggleList__input {
    position: relative;
    left: 25px;
    padding: 10px 5px;
    border: none;
    width: 95%;
    outline: none;
    font-size: 16px;
    height: 100%;
    resize: none;
  }

  li {
    list-style: none;
  }

  .toggleList__remove {
    position: absolute;
    top: 10px;
    right: -5px;
    cursor: pointer;

    &:hover {
      background-color: rgb(233, 233, 233);
      border-radius: 5px;
    }
    &:active {
      background-color: rgb(211, 211, 211);
      border-radius: 5px;
    }
  }
`;
