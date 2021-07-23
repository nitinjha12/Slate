import styled from "styled-components";

export const ModelWindowStyle = styled.section`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModelStyle = styled.section`
  width: 90%;
  height: 90%;
  background-color: white;
  border-radius: 10px;
  overflow-y: scroll;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #c2c9d2;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #999;
  }
`;

export const ModelNavStyle = styled.nav`
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  grid-gap: 2rem;
  /* position: sticky;
  top: 0;
  z-index: 100;
  background-color: white; */

  .nav__option {
    flex: 1;
    text-align: center;
    cursor: pointer;
  }

  .nav--active {
    font-weight: bold;
  }

  .nav--active::after {
    content: "";
    display: block;
    width: 90%;
    height: 2px;
    background-color: black;
    margin-top: 10px;
    padding-left: 10%;
  }
`;

export const UploadStyle = styled.section`
  height: 90%;

  .upload__dragndrop {
    height: 50%;
  }

  .upload__urlField {
    height: 50%;
    padding: 50px;
  }

  .upload__form {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .upload__input {
    background-color: white;
    padding: 7px;
    color: black;
  }
`;

export const UnsplashStyle = styled.section`
  .unaplash__imageContainer {
    padding: 40px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 2fr));
    grid-gap: 2rem;
    height: 100%;
    overflow-y: hidden;

    .rowGrid {
      height: 100%;
      grid-row: span 2;
    }
  }

  .unsplash__image {
    cursor: pointer;
  }

  .unsplash__form {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .unsplash__input {
    padding: 4px 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: min(80%, 300px);
    margin-right: 10px;
  }

  .unsplash__button {
    border: none;
    padding: 4px 12px;
    border-radius: 5px;
    background-color: black;
    color: white;
    cursor: pointer;
  }
`;
