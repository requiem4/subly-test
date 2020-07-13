import React from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import useStyles from "./styles";
import {Paper} from "@material-ui/core";
function Order(props) {
  let items = props.items
  let type = props.type


  const classes = useStyles();
  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    let source = result.source
    let destination = result.destination
    if (source.droppableId === destination.droppableId) {
      items = reorder(
        items,
        source.index,
        destination.index
      );
    } else {
      const result = move(
        items,
        items,
        source,
        destination
      );

    }



    /*this.setState({
      items
    });*/
  }
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  let droppableId = "droppable"+type;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div  ref={provided.innerRef} className={classes.list}>
          {items.map((item, index) => (
            <Draggable
              key={item.id}
              draggableId={item.id + ''}
              index={index}>
              {(provided, snapshot) => (
                <Paper
                  className={classes.group}
                  elevation={2}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {item.content}
                </Paper>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    </DragDropContext>
  );
}

export default Order