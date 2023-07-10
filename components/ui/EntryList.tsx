import { DragEvent, FC, useContext, useMemo } from 'react'
import { List, Paper } from '@mui/material'
import { EntryCard } from './'
import { EntryStatus } from '@/interfaces'
import { EntriesContext } from '@/context/entries'
import { UIContext } from '@/context/ui'
import styles from './EntryList.module.css'

interface Props {
    status: EntryStatus,
    children?: React.ReactNode
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext)
    const { isDragging, endDragging } = useContext(UIContext)

    // Filtramos para asociar cada entrada
    // const entriesByStatus = entries.filter(entry => entry.status === status)
    // Ahora con useMemo
    // Debe memorizarse cuando las entries cambien
    // La primera es una funcion que regresa un valor
    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }
    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text')

        const entry = entries.find(e => e._id === id)!
        entry.status = status
        updateEntry(entry)
        endDragging()

    }

    return (
        // TODO: aqui se hará drop
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ''}
        >
            <Paper sx={{ height: 'calc(100vh - 250px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '1px 5px', '&::-webkit-scrollbar': { display: 'none' } }}>
                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
                    {
                        entriesByStatus.map(entry => (
                            <EntryCard key={entry._id} entry={entry} />
                        ))
                    }
                </List>
            </Paper>
        </div>
    )
}
