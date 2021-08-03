import { useState, createContext } from "react";
import { EditorType } from "types";

const Context = createContext<ContextInterface>({
  isModel: false,
  changeSetModel(bool: boolean) {},
  data: { editor: null },
  getEditor(editor: EditorType) {},
  isLight: true,
  changeTheme(bool) {},
  colLayout: false,
  setColLayout(bool) {},
  isCarousel: false,
  setCarousel(bool) {},
  dragPath: [0],
  setDragPath(path) {},
});

interface ContextInterface {
  isModel: boolean;
  changeSetModel(bool: boolean): void;
  data: { editor: EditorType | null };
  getEditor(editor: EditorType): void;
  isLight: boolean;
  changeTheme(bool: boolean): void;
  colLayout: boolean;
  setColLayout(bool: boolean): void;
  isCarousel: boolean;
  setCarousel(bool: boolean): void;
  dragPath: number[];
  setDragPath(path: number[]): void;
}

interface DataInterface {
  editor: EditorType | null;
}

export const Provider = ({ children }: any) => {
  const [isModel, setIsModel] = useState(false);
  const [data, setData] = useState<DataInterface>({ editor: null });
  const [isLight, setLight] = useState(true);
  const [colLayout, setColLayout] = useState(false);
  const [isCarousel, setCarousel] = useState(false);
  const [dragPath, setDragPath] = useState([0]);

  function changeSetModel(bool: boolean) {
    setIsModel(bool);
  }

  function getEditor(editor: EditorType) {
    setData((data: DataInterface) => ({ ...data, editor }));
  }

  function changeTheme(bool: boolean) {
    setLight(bool);
  }

  const value = {
    isModel,
    changeSetModel,
    data,
    getEditor,
    isLight,
    changeTheme,
    colLayout,
    setColLayout,
    isCarousel,
    setCarousel,
    dragPath,
    setDragPath,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Context;
