import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';

import { Movie } from '../models/movie.model';
import { SetMovies, SetSearchParam, SetSortParams } from './movies.actions';

const JSON_URL = '../../assets/movies.json';

interface MoviesState {
    sortParams: {
        sortBy: string;
        direction: string;
    };
    searchString: string;
    movies: [];
};

@State<MoviesState>({
    name: 'moviesState',
    defaults: {
        sortParams: {
            sortBy: '',
            direction: 'asc'
        },
        searchString: '',
        movies: []
    }
})
@Injectable()
export class MoviesStore {

    constructor(private http: HttpClient, private store: Store) {
        this.http.get(JSON_URL).subscribe((data: []) => {
            this.store.dispatch(new SetMovies(data));
        });
    }

    @Selector()
    static movies(state: MoviesState): Movie[] {
        const params = state.sortParams;
        let movies = [...state.movies];
        if (state.searchString) {
            movies = movies.filter((movie: Movie) => movie.Title
                .toLowerCase().includes(state.searchString.toLowerCase()));
        }
        const sortCondition = (direction:string) => {
            if (direction === 'asc') {
                return (a: any, b: any) => a[params.sortBy] > b[params.sortBy] ? 1 : -1;
            } else {
                return (a: any, b: any) => a[params.sortBy] > b[params.sortBy] ? -1 : 1;

            }
        }
        return movies.sort(sortCondition(params.direction));

    }

    @Selector()
    static sortBy(state: MoviesState): string {
        return state.sortParams.sortBy;
    }

    @Selector()
    static sortDirection(state: MoviesState): string {
        return state.sortParams.direction;
    }

    @Selector()
    static searchString(state: MoviesState): string {
        return state.searchString;
    }

    @Action(SetMovies)
    setMovies({ setState, getState }: StateContext<MoviesState>, { movies }) {
        const state = getState();
        setState({
            ...state,
            movies
        });
    }

    @Action(SetSortParams)
    setSortBy({ patchState, getState, dispatch }: StateContext<MoviesState>, { sortBy, direction }) {
        const state = getState();
        patchState(
            {
                sortParams: {
                    sortBy, direction
                }
            }
        );
    }

    @Action(SetSearchParam)
    setSearchParam({ setState, getState }: StateContext<MoviesState>, { searchString }) {
        const state = getState();
        setState({
            ...state,
            searchString
        });
    }

}
