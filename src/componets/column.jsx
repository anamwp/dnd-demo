import React, { Component } from 'react'
import styled from 'styled-components';
import Task from './task'
import {Droppable, Draggable} from 'react-beautiful-dnd'

const Container = styled.div`
    border:solid 1px lightgray;
    margin:15px;
    padding:15px;
    flex:1;
    background:white;

    display:flex;
    flex-direction:column;
`;
const Title = styled.h3`
    margin-bottom:15px;
`;
const SubTitle = styled.h4`
    margin-bottom:15px;
    text-transform:capitalize;
`;

const TaskList = styled.div`
    margin-bottom:10px;
    background: ${props => (props.isDraggingOver) ? 'skyblue': 'inherit'}
    padding:15px;
    border:solid 1px lightgray;
    transition: background-color 0.2s ease;
    flex-grow:1;
    min-height:100px;
`;


export class column extends Component {
    render() {
        const {index, column, tasks} = this.props;
        return (
            <Draggable draggableId={column.id} index={index} > 
                {(provided) => (
                
                <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    
                    <Title {...provided.dragHandleProps} >
                        {column.title}
                    </Title>

                    <Droppable droppableId={column.id} type="task">
                        {(provided, snapshot) => (
                            <TaskList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                <SubTitle>{column.id}</SubTitle>
                                {
                                    tasks.map( (task, index) => 
                                        <Task key={index} task={task} index={index}  />
                                    )
                                }
                                {
                                    provided.placeholder
                                }    
                            </TaskList>
                        )}
                    </Droppable>                
                </Container>
                    
                )}
            </Draggable>
        )
    }
}

export default column
