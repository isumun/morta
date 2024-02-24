import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const MortalContext = createContext();
export const useMortal = () => useContext(MortalContext);

const MortalContextProvider = ({ children }) => {
    const API_MORTAL = "http://localhost:3000/mortal";
    const API_MORTAL_BASKET = "http://localhost:3000/mortalBasket";

    const [mortalProduct, setMortalProduct] = useState([]);
    const [oneMortalProduct, setOneMortalProduct] = useState({});

    const addMortalCombatPlus = async (newMortalCombotProduct) => {
        await axios.post(API_MORTAL, newMortalCombotProduct);
        await readMortalCombatProduct();
    };

    const readMortalCombatProduct = async () => {
        const response = await axios.get(API_MORTAL);
        setMortalProduct(response.data);
    };

    const mortalDeleteProduct = async (id) => {
        await axios.delete(`${API_MORTAL}/${id}`);
        await readMortalCombatProduct();
    };

    const getOneMortalProduct = async (id) => {
        const { data } = await axios.get(`${API_MORTAL}/${id}`);
        setOneMortalProduct(data);
    };

    const editMortalProduct = async (id, newMortalAPIProduct) => {
        await axios.put(`${API_MORTAL}/${id}`, newMortalAPIProduct);
        await readMortalCombatProduct();
    };

    const [mortalCombatPage, setMortalCombatPage] = useState(1);
    const itemsMortalParPage = 8;
    const MortalCount = Math.ceil(mortalProduct.length / itemsMortalParPage);

    const currentPage = () => {
        const startPagination = (mortalCombatPage - 1) * itemsMortalParPage;
        const endPaination = startPagination + itemsMortalParPage;
        return mortalProduct.slice(startPagination, endPaination);
    };

    return (
        <MortalContext.Provider
            value={{
                mortalProduct,
                oneMortalProduct,
                addMortalCombatPlus,
                readMortalCombatProduct,
                mortalDeleteProduct,
                getOneMortalProduct,
                editMortalProduct,
                setMortalProduct,
                MortalCount,
                mortalCombatPage,
                setMortalCombatPage,
                currentPage,
            }}
        >
            {children}
        </MortalContext.Provider>
    );
};

export default MortalContextProvider;
