import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';

import { Movie } from '../models/movie.model';
import { SetFilterByRatingsParams, SetMovies, SetSearchParam, SetSortParams } from './movies.actions';

const JSON_URL = '../../assets/movies.json';

interface MoviesState {
    sortParams: {
        sortBy: string;
        direction: string;
    };
    searchString: string;
    filterByRatingsParams: {
        filterBy: string;
        operator: string
    }
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
        filterByRatingsParams: {
            filterBy: '',
            operator: ''
        },
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

    static searchFilter(movies: Movie[], searchString: string): Movie[] {
        if (searchString) {
            return movies.filter((movie: Movie) => movie.Title
                .toLowerCase().includes(searchString.toLowerCase()));
        }
        return movies;
    }

    static sortCondition = (params) => {
        if (params.direction === 'asc') {
            return (a: Movie, b: Movie) => a[params.sortBy] > b[params.sortBy] ? 1 : -1;
        } else {
            return (a: Movie, b: Movie) => a[params.sortBy] > b[params.sortBy] ? -1 : 1;
        }
    }

    static filterByRatings(movie: Movie, filterParams) {
        let { filterBy, number, operator } = filterParams;
        let flag = false;

        if (!(number && operator && filterBy)) {
            return true;
        }
        switch (operator) {
            case '>=':
                flag = movie[filterBy] >= number;
                break;
            case '<=':
                flag = movie[filterBy] <= number;
                break;
            case '>':
                flag = movie[filterBy] > number;
                break;
            case '<':
                flag = movie[filterBy] < number;
                break;
        }
        return flag;
    }

    @Selector()
    static movies(state: MoviesState): Movie[] {
        const { sortParams, filterByRatingsParams } = state;
        let movies: Movie[] = [...state.movies];
        
        movies = this.searchFilter(movies, state.searchString);
        movies = movies.filter(item => this.filterByRatings(item, filterByRatingsParams));

        return movies.sort(this.sortCondition(sortParams));
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
    setSortBy({ patchState, getState }: StateContext<MoviesState>, { sortBy, direction }) {
        const state = getState();
        patchState(
            {
                sortParams: { sortBy, direction }
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

    @Action(SetFilterByRatingsParams)
    setFilterByRatingsParams({ setState, getState }: StateContext<MoviesState>, { filterByRatingsParams }) {
        const state = getState();
        setState({
            ...state,
            filterByRatingsParams
        });
    }

}
