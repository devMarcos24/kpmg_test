import * as Shad from "@/components/ui"
import { TableDemo } from "@/components/table-component"
import { XCircle } from 'lucide-react'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function Home() {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex items-center justify-between p-1 mb-1 gap-8 ">
        <div className="inline-flex gap-2	">
          <Shad.Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Procurar filme por nome" className="w-96" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Shad.Button onClick={() => setSearch("")} className="mr-2 bg-none">
                <XCircle className="size-4" />
              </Shad.Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Limpar</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Shad.Button onClick={() => navigate("/register")} >Cadastrar</Shad.Button>
      </div>
      <div className="rounded-lg p-2 border-solid border-2 border-sky-primary radius-4">
        <TableDemo search={search} />
      </div>
    </div>
  )
}