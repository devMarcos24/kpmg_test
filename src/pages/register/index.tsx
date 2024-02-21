import * as Shad from "@/components/ui"
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import { IMovie } from "@/hooks/interface"
import { useMovie } from "@/hooks/movies"


export function Register() {
  const navigate = useNavigate()
  const { addMovie, editMovie, updateMovie, setUpdateMovie } = useMovie()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMovie>()

  const onSubmit: SubmitHandler<IMovie> = (data) => {
    updateMovie ? editMovie(updateMovie.id, { ...updateMovie, ...data }) : addMovie(data)

    navigate(-1)
  }

  return (
    <div>
      <div className="flex items-center justify-between p-1 mb-1 gap-8 ">
        <div className="inline-flex gap-2	">
          <Shad.Button onClick={() => {
            setUpdateMovie(null)
            navigate(-1)
          }} className="mr-2 bg-none">
            <ArrowLeft className="size-4" />
          </Shad.Button>
        </div>
      </div>
      <div className="rounded-lg p-2 border-solid border-2 border-sky-primary radius-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <Shad.Input placeholder="Nome do filme" defaultValue={updateMovie?.name || ""} {...register("name", { required: true })} />
          <span className="text-xs text-red-700		">
            {errors.name && "Nome é obrigatório"}
          </span>
          <Shad.Input placeholder="Categoria do filme" defaultValue={updateMovie?.category || ""} {...register("category", { required: true })} />
          <span className="text-xs text-red-700		">
            {errors.category && "Categoria é obrigatória"}
          </span>
          <Shad.Button className="w-full" type="submit">{updateMovie ? "Atualizar" : "Salvar"}</Shad.Button>
        </form>
      </div>
    </div>
  )
}