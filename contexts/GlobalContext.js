import React, { useState, createContext, useEffect } from 'react'

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [user, setUser] = useState({})

  useEffect(() => {
    // cada vez que hay cambios en el user se ejecuta
    // console.log(user);
    if(Object.keys(user).length === 0) {
      // se cerro sesion
      // implementar algo si es necesario
    }
  }, [user])

  return (
    <DataContext.Provider value={{ user, setUser }}>
      {children}
    </DataContext.Provider>
  )
}
