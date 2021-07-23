import { useState, createContext } from "react";
import { EditorType } from "types";

const Context = createContext<ContextInterface>({
  isModel: false,
  changeSetModel(bool: boolean) {},
  data: { editor: null },
  getEditor(editor: EditorType) {},
});

interface ContextInterface {
  isModel: boolean;
  changeSetModel(bool: boolean): void;
  data: { editor: EditorType | null };
  getEditor(editor: EditorType): void;
}

interface DataInterface {
  editor: EditorType | null;
}

export const Provider = ({ children }: any) => {
  const [isModel, setIsModel] = useState(false);
  const [data, setData] = useState<DataInterface>({ editor: null });

  function changeSetModel(bool: boolean) {
    setIsModel(bool);
  }

  function getEditor(editor: EditorType) {
    setData((data: DataInterface) => ({ ...data, editor }));
  }

  const value = {
    isModel,
    changeSetModel,
    data,
    getEditor,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Context;
