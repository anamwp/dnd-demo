const initialData = {
    tasks:{
        'task-1': { id:'task-1', content:'Get up early in the morning.' },
        'task-2': { id:'task-2', content:'Make your day plan in the morning.' },
        'task-3': { id:'task-3', content:'Pritotize your work.' },
        'task-4': { id:'task-4', content:'Execute the top priority task first.' },
        'task-5': { id:'task-5', content:'Then execute the less priority task.' },
    },
    columns:{
        'column-1':{
            id: 'column-1',
            title:'To Do',
            taskIds:['task-1','task-2','task-3','task-4','task-5'],
        },
        
        'column-2':{
            id: 'column-2',
            title:'In Progress',
            taskIds:[],
        },
        
        'column-3':{
            id: 'column-3',
            title:'Done',
            taskIds:[],
        },

    },
    // facilitate reordering the columns
    columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;