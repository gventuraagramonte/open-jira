import { DragEvent, FC, useContext } from 'react'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { Entry } from '@/interfaces'
import { UIContext } from '@/context/ui'

interface Props {
    children?: React.ReactNode,
    entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
    const { startDragging, endDragging } = useContext(UIContext)

    const onDragStart = (event: DragEvent) => {

        event.dataTransfer.setData('text', entry._id)
        // TODO: Modificar el estado, para indicar que estoy haciendo drag
        startDragging()

    }

    const onDragEnd = () => {
        // TODO: cancelar onDrag o finalizando el drag
        endDragging()
    }

    return (
        // TODO: Eventos drag
        <Card sx={{ marginBottom: 1 }} draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>hace 30 minutos</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
