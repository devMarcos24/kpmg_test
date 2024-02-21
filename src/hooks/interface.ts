export type IMovie = {
  id: number;
  name: string;
  category: string;
}

export interface IMovieContextData {
  movies: Array<IMovie>;
  addMovie: (movie: IMovie) => void;
  removeMovie: (id: number) => void;
  editMovie: (id: number, movie: IMovie) => void;
  updateMovie: IMovie | null
  setUpdateMovie: (movie: IMovie | null) => void
}
