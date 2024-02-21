import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { IMovie, IMovieContextData } from './interface'
import { Stores, addData, getAll, removeData, updateData } from '@/database';


const MovieContext = createContext<IMovieContextData>({} as IMovieContextData)

interface MyComponentProps {
  children: ReactNode;
  databaseInited: boolean;
}

export const MovieProvider: React.FC<MyComponentProps> = ({ children, databaseInited }) => {
  const [data, setData] = useState<IMovie[]>([])
  const [updateMovie, setUpdateMovie] = useState<IMovie | null>(null)

  useEffect(() => {
    (async () => {
      if (databaseInited) {

        const response = await getAll(Stores.Movies)

        if (response?.length) return setData(response as IMovie[])

        setData([])
      }
    })()
  }, [databaseInited])

  const addMovie = (movie: IMovie) => {
    const id = new Date().getTime()

    setData([...data, { ...movie, id }])
    addData(Stores.Movies, { ...movie, id })
  }

  const removeMovie = (id: number) => {
    setData(data.filter(mov => mov.id !== id))
    removeData(Stores.Movies, id)
  }

  const editMovie = (id: number, movie: IMovie) => {
    setData(data.map(mov => {
      if (mov.id === id) {
        return movie
      }

      return mov
    }))

    updateData(Stores.Movies, movie)
    setUpdateMovie(null)
  }

  return (
    <MovieContext.Provider value={{ movies: data, addMovie, editMovie, removeMovie, updateMovie, setUpdateMovie }}>
      {children}
    </MovieContext.Provider>
  )
}

export function useMovie(): IMovieContextData {
  const context = useContext(MovieContext)

  if (!context) {
    throw new Error("useMovie must be used within an MovieProvider");
  }

  return context
}