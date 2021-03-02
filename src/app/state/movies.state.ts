import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetSearchParam, SetSortBy } from './movies.actions';

interface MoviesState {
    sortBy: string;
    searchString: string;
};

@State<MoviesState>({
    name: 'moviesState',
    defaults: {
        sortBy: '',
        searchString: ''
    }
})
@Injectable()
export class MoviesStore {

    constructor() { }

    @Selector()
    static sortBy(state: MoviesState): string {
        return state.sortBy;
    }

    @Selector()
    static searchString(state: MoviesState): string {
        return state.searchString;
    }

    @Action(SetSortBy)
    setSortBy({setState, getState }: StateContext<MoviesState>, { sortBy }) {
        const state = getState();
        setState({
            ...state,
            sortBy
        });
    }

    @Action(SetSearchParam)
    setSearchParam({setState, getState }: StateContext<MoviesState>, { searchString }) {
        const state = getState();
        setState({
            ...state,
            searchString
        });
    }

}
