import { BrowserRouter } from "react-router-dom"
import { Routers } from "@/routers"
import { useEffect, useState } from "react";
import { initDB } from "@/database";
import { MovieProvider } from "./hooks/movies";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  const [databaseInited, setDatabaseInited] = useState(false)

  useEffect(() => {
    (async () => {
      const result = await initDB();
      setDatabaseInited(result)
    })()
  }, [])

  return (
    <MovieProvider databaseInited={databaseInited}>
      <BrowserRouter>
        <TooltipProvider>
          <Routers />
        </TooltipProvider>
      </BrowserRouter>
    </MovieProvider>
  )
}

export default App