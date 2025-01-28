/* eslint-disable react/prop-types */
import {createContext, useState} from "react";

export const BookContext = createContext()

const BookProvider = ({children}) => {
    const [ books, setBooks ] = useState([])

    return (
        <BookContext.Provider value={{books, setBooks}}>
            {children}
        </BookContext.Provider>
    )
}

export default BookProvider