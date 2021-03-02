import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { MoviesService } from '../services/movies.service';
import { SetSortBy } from './movies.actions';


interface MoviesState {
    sortBy: string;
};

@State<MoviesState>({
    name: 'moviesState',
    defaults: {
        sortBy: ''
    }
})
@Injectable()
export class MoviesStore {

    constructor(private readonly moviesService: MoviesService) { }

    @Selector()
    static sortBy(state: MoviesState): string {
        return state.sortBy;
    }

    @Action(SetSortBy)
    setSortBy({ patchState, setState, getState }: StateContext<MoviesState>, { sortBy }) {
        const state = getState();
        setState({ ...state, sortBy });
    }

}
