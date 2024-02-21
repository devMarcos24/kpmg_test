
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2, Edit2 } from 'lucide-react'
import { useEffect, useState } from "react"
import { useMovie } from "@/hooks/movies"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { IMovie } from "@/hooks/interface"
import { useNavigate } from "react-router-dom"


export function TableDemo({ search }: { search: string }) {
    const { movies, removeMovie, setUpdateMovie } = useMovie()
    const [movieList, setMovieList] = useState(movies)

    const navigate = useNavigate()

    useEffect(() => {
        if (search) {
            return setMovieList(movies.filter((invo) => invo.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())))
        }


        setMovieList(movies)
    }, [search, movies?.length])

    const handleUpdateMovie = (item: IMovie | null) => {
        setUpdateMovie(item)
        navigate('/register')
    }

    return (
        <Table>
            <TableCaption>{movieList && movieList.length ? "Lista de filmes cadastros" : "Nenhum filme cadastrado ainda"}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {movieList && movieList.length ? movieList.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-right ">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button onClick={() => handleUpdateMovie(item)} className="mr-2 bg-none">
                                        <Edit2 className="size-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Editar</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button onClick={() => removeMovie(item.id)}>
                                        <Trash2 className="size-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Deletar</p>
                                </TooltipContent>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                )) : null}
            </TableBody>
        </Table>
    )
}