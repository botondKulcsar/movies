import { FavActors } from "./fav-actors.model";
import { FavMovies } from "./fav-movies.model";
import { Friends } from "./friends.model";
import { MarkedAsFriends } from "./marked-as-friends.model";

export class User {
    _id: string = ''
    firstName?: string = '';
    lastName?: string = '';
    nickName: string = '';
    city?: string = '';
    yearOfBirth?: string = '';
    avatarURL?: string = '';
    email: string = '';
    password: string = '';
    friends: Friends[] = [];
    markedAsFriends: MarkedAsFriends[] = [];
    movieCategories: string[] = [];
    favMovies: FavMovies[] = [];
    favActors: FavActors[] = [];
    
}
