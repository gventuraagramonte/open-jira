// En el reducer no se recibe codigo de terceros, o funciones externas
import { Entry } from '@/interfaces';
import { EntriesState } from './EntriesProvider';

type EntriesActionType =
    | { type: '[Entry] - Add-Entry', paylodad: Entry }
    | { type: '[Entry] - Entry-Updated', paylodad: Entry }


export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
    switch (action.type) {
        case '[Entry] - Add-Entry':
            return {
                ...state,
                entries: [...state.entries, action.paylodad]
            }

        case '[Entry] - Entry-Updated':
            return {
                ...state,
                entries: state.entries.map(entry => {
                    if (entry._id === action.paylodad._id) {
                        entry.status = action.paylodad.status
                        entry.description = action.paylodad.description
                    }
                    return entry
                })
            }
        default:
            return state
    }
}