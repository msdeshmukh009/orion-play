import { createContext, useEffect, useState, useContext } from "react";
import { getCategoriesService } from "../services";

const categoryContext = createContext();

const useCategory = () => useContext(categoryContext);

const CategoryProvider = ({ children }) => {
  const [categoryState, setCategoryState] = useState({ loading: false, categories: [], error: "" });

  useEffect(() => {
    (async () => {
      try {
        setCategoryState(prevState => ({ ...prevState, loading: true, error: "" }));
        const { status, data } = await getCategoriesService();
        if (status === 200) {
          setCategoryState(prevState => ({
            ...prevState,
            categories: data.categories,
            loading: false,
          }));
        }
      } catch (err) {
        setCategoryState(prevState => ({
          ...prevState,
          error: err.response.data.errors[0],
          loading: false,
        }));
      }
    })();
  }, []);

  return (
    <categoryContext.Provider value={{ categoryState, setCategoryState }}>
      {children}
    </categoryContext.Provider>
  );
};

export { useCategory, CategoryProvider };
