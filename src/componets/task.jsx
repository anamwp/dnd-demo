import React, { Component } from 'react'
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd'


const Container = styled.div`
    border:solid 1px lightgrey;
    border-radius:2px;
    padding:10px;
    margin-bottom:10px;
    background:${props => (props.isDragging ? 'lightgreen': 'white')};
`

export class task extends Component {
    render() {
        const {task, index} = this.props;
        return (
            <Draggable 
                draggableId={this.props.task.id}
                index={this.props.index}
            >
                {(provided, snapshot) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        {task.id} = {task.content}
                    </Container>
                )}
            </Draggable>
        )
    }
}

export default task
