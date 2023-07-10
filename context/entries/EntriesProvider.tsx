import { FC, useReducer } from 'react'
import { EntriesContext, entriesReducer } from './'
import { Entry } from '@/interfaces'
import { v4 as uuidv4 } from 'uuid'


type Props = {
    children?: React.ReactNode
}

export interface EntriesState {
    entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'P Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ullam nesciunt',
            createdAt: Date.now(),
            status: 'pending'
        }, {
            _id: uuidv4(),
            description: 'I Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, eaque quidem',
            createdAt: Date.now() - 1000000,
            status: 'in-progress'
        },
        {
            _id: uuidv4(),
            description: 'F Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti autem cupiditate',
            createdAt: Date.now() - 100000,
            status: 'finished'
        }
    ]
}


export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({ type: '[Entry] - Add-Entry', paylodad: newEntry })
    }

    const updateEntry = (entry: Entry) => {
        dispatch({ type: '[Entry] - Entry-Updated', paylodad: entry })
    }

    return (
        <EntriesContext.Provider value={{
            ...state,
            // Methods
            addNewEntry,
            updateEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
}