import styled from "styled-components";
import { ModelStyle } from "./model";

export const CarouselStyle = styled(ModelStyle)`
  font-family: "Lato", sans-serif;
  padding: 30px;

  .carousel__page {
    margin: 40px;
    position: relative;
    display: flex;
  }

  .carousel__btn {
    padding: 5px 15px;
    position: absolute;
    background-color: white;
    outline: none;
    border-radius: 5px;
    border: 1px solid black;
    cursor: pointer;
    right: 0px;
  }
`;

export const CountStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  grid-gap: 1rem;

  select {
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    border: 2px solid #3d5baf;
    outline: none;
    /* appearance: none; */
  }

  option {
    border-radius: 5px;
  }
`;

export const CaraouselWidthStyle = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-gap: 0.5rem;

  .carousel__widthContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-gap: 2rem;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  .carousel__imageWidth {
    padding: 10px;
    outline: none;
    border: 2px solid #3d5baf;
    border-radius: 5px;
  }
`;

export const ImageShapeStyle = styled.div`
  display: flex;
  grid-gap: 2rem;
  margin-top: 40px;
  flex-direction: column;

  .imageShape__text {
    text-align: center;
  }

  .imageShape__container {
    display: flex;
    grid-gap: 2rem;
    align-items: center;
    justify-content: center;

    .imageShape__btn {
      display: flex;
      flex: 1;
      main {
        width: 100%;

        div {
          div {
            padding-top: 60% !important;
          }
        }
      }
    }

    .imageShape--round {
      div {
        div {
          padding-top: 40% !important ;
        }
        img {
          border-radius: 100%;
          min-height: 300px !important;
          min-width: 300px !important;
          max-height: 300px !important;
          max-width: 300px !important;
        }
      }
    }
  }
`;

export const CaraouselLibraryStyle = styled.section`
  .selected__img {
    padding: 0px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.7);
    border-radius: 10px;

    main {
      min-height: 100%;
    }
  }
`;

export const CarouselContainerStyle = styled.section`
  padding: 60px 60px;
  width: 100%;
  height: 100%;
  background-color: #f5f8fb;

  @media (max-width: 450px) {
    padding: 60px 20px;
  }
`;

export const CaraouselStyle = styled.section`
  width: 100%;
  position: relative;
  height: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;

  .caraousel__container {
    width: 100%;
    position: relative;
    margin: 0 auto;
    overflow: hidden;
    height: 70vh;

    @media (max-width: 900px) {
      height: 100vh;
    }
  }

  .btn__caraousel {
    position: absolute;
    top: 50%;
    font-size: 1.25rem;
    height: 2.5rem;
    width: 2.5rem;
    color: #000;
    background: rgba(255, 255, 255, 0.7);
    z-index: 30;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 50%;
  }

  .btn-prev {
    left: 0;
  }

  .btn-next {
    right: 0;
  }

  .caraousel__dots {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: 20px;

    .caraousel__datadots {
      border: none;
      background-color: #b9b9b9;
      opacity: 0.7;
      cursor: pointer;
      margin-right: 1rem;
      height: 1rem;
      width: 1rem;
      border-radius: 50%;
      transition: all 0.5s;
    }

    .caraousel__datadots__active {
      background-color: #888;
      opacity: 1;
    }
  }
`;

export const CarouselItemStyle = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  grid-gap: 2rem;
  padding: 0 40px;
  width: 100%;
  height: 100%;
  margin: 50px 0;

  @media (max-width: 900px) {
    flex-direction: column;
  }

  .caraousel__dataImg {
    border-radius: 50%;
    object-fit: contain;
    flex: 0.8;
    position: relative;

    @media (max-width: 900px) {
      border-radius: 100%;
      flex: 0.6;
    }
  }

  .caraousel__dataDetails {
    text-align: center;
    align-self: center;
    h6 {
      font-weight: bold;
      display: inline-block;
      position: relative;

      ::after {
        content: "";
        background-color: #0083e4;
        height: 3px;
        margin-top: 10px;
        width: 100%;
        display: block;
      }
    }

    h1 {
      position: relative;
    }

    p {
      margin: 0 !important;
    }
  }

  @media (max-width: 600px) {
    padding: 0;
  }
`;
