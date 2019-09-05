import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import InitialData from './initialData'
import Column from './componets/column'
import styled from 'styled-components'

const Container = styled.div`
    display:flex;
`

class App extends React.Component{
    
    state = InitialData;

    onDragEnd = result => {
        // console.log(this.state, result);
        const {destination, source, draggableId, type} = result;
        
        // if there is no destinaton then return
        if(!destination){
            return;
        }
        
        // if drag position and drop position are same
        if(
            destination.droppableId === source.droppableId &&
            destination.index === source.inde
        ){
            return;
        }

        if(type=== 'column'){
            console.log(this.state.columnOrder);
            const newColumnOrder = Array.from(this.state.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);
            console.log(newColumnOrder);
            const newState = {
                ...this.state,
                columnOrder:newColumnOrder,
            };
            console.log('new State while columndrag', newState);
            this.setState(newState);
            console.log(this.state);
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        // console.log(start, finish);

        if(start === finish){
            const newTaskIds = Array.from(start.taskIds);
        
            //remove the dragged items index from original array
            newTaskIds.splice(source.index, 1);
            // console.log('start', start.taskIds, 'nesTaskIds', newTaskIds);
    
            // then place that dragged id index to where it dropped in that array
            newTaskIds.splice(destination.index, 0, draggableId);
            // console.log('again start', start, 'again nesTaskIds', newTaskIds);
    
            
            //
            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };
            // console.log('newColumn', newColumn);
    
            const newState = {
                ...this.state,
                columns:{
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                }
            };
            // console.log('newState', newState);
    
            this.setState(newState);
            return;
        }

        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };
        // console.log('new start', newStart);
        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };
        // console.log('new finish', newFinish);


        const newState = {
            ...this.state,
            columns:{
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };
        // console.log('new state', newState);
        this.setState(newState);
        
    }
    render(){
        console.log('render state', this.state);
        return (
            <DragDropContext onDragEnd={this.onDragEnd} >
                <Droppable 
                    droppableId="all-columns"
                    direction="horizontal"
                    type="column"
                >
                    {provided => (
                    <Container 
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {
                            this.state.columnOrder.map( (columnId, index) => {
                                const column = this.state.columns[columnId];
                                console.log('column', column.taskIds);
                                const tasks = column.taskIds.map( taskId => this.state.tasks[taskId] );
                                
                                return( 
                                    <Column
                                    index={index}
                                    key={column.id}
                                    column={column}
                                    tasks={tasks}
                                    />
                                );
                            })
                        }
                        {provided.placeholder}
                    </Container>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }

}


ReactDOM.render(<App />, document.getElementById('root'));

