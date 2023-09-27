import React, { useState } from "react";

//importing bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

//writing this after the bootstrap import so we can overwrite the bootstrap style if needed!
import "./styles.scss";

import COMMENTS from "./MOCK_DATA.json";
import Comments from "./components/Comments";
import Comment from "./components/Comment";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const App = () => {
  const [comments, setComments] = useState(COMMENTS);

  const dragEnded = (param) => {
    const { source, destination } = param;
    let _arr = [...comments];
    //extracting the source item from the list
    const _item = _arr.splice(source.index, 1)[0];
    //inserting it at the destination index.
    _arr.splice(destination.index, 0, _item);
    setComments(_arr);
  };
  return (
    <div className="container py-5">
      <h1>Comments</h1>
      <p>Drag to rearrange comments &lt;3</p>
      <div className="col-sm-12 col-md-5">
        {/* rendering comments */}
        <DragDropContext onDragEnd={dragEnded}>
          <Droppable droppableId="comments-wrapper">
            {(provided, snapshot) => (
              <Comments ref={provided.innerRef} {...provided.droppableProps}>
                {comments.map((_comment, index) => {
                  return (
                    <Draggable
                      draggableId={`comment-${_comment.id}`}
                      index={index}
                      key={_comment.id}
                    >
                      {(_provided, _snapshot) => (
                        <Comment
                          ref={_provided.innerRef}
                          dragHandleProps={_provided.dragHandleProps}
                          {..._provided.draggableProps}
                          snapshot={_snapshot}
                          {..._comment}
                        />
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Comments>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;
