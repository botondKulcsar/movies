export interface Film {
  id?: number;
  Title: string;
  Year?: number;
  Rated: string;
  Released: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: {Source: string, Value: string}[]

  Metascore?: number;
  imdbRating?: number;
  imdbVotes?: number;
  imdbID?: number;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response?: boolean
}
