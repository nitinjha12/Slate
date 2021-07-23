import "../styles/globals.css";
import "../styles/app.scss";
import { AppProps } from "next/app";
import { Provider } from "context/context";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider>
        {/* <DndProvider backend={Backend}> */}
        <Component {...pageProps} />
        {/* </DndProvider> */}
      </Provider>
    </>
  );
}

export default MyApp;
