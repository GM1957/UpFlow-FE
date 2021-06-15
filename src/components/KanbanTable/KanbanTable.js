import React, { useState, useEffect } from "react";
import { axios, apis } from "../../services";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CreateTaskModal from "../CreateTaskModal/CreateTaskModal";
import ShowTaskModal from "../ShowTaskModal/ShowTaskModal";
import KanbanHeader from "../KanbanHeader/KanbanHeader";
import { v4 as uuid } from "uuid";
import classes from "./KanbanTable.module.css";

const KanbanTable = (props) => {
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    let newColumnsUpdated = {};

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.tasks];
      const destItems = [...destColumn.tasks];

      const [removed] = sourceItems.splice(source.index, 1);

      destItems.splice(destination.index, 0, removed);
      newColumnsUpdated = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destItems,
        },
      };
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.tasks];
      const [removed] = copiedItems.splice(source.index, 1);

      copiedItems.splice(destination.index, 0, removed);
      newColumnsUpdated = {
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedItems,
        },
      };
    }
    setColumns({ ...newColumnsUpdated });
    saveAllColumnState({ ...newColumnsUpdated });
  };

  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [project, setProject] = useState({});
  const [columns, setColumns] = useState({});
  const [newColumnName, setNewColumnName] = useState("");
  const [isColumnLoading, setColumnsLoading] = useState(false);

  const createTaskModalHandler = () => {
    setShowCreateTaskModal(false);
  };

  const showTaskModalHandler = () => {
    setShowTaskModal(false);
  };

  const fetchColumns = async () => {
    setColumnsLoading(true);
    setColumns({});
    try {
      const result = await axios.post(apis.GET_PROJECT, {
        projectId: props.projectId,
      });

      setProject(result.data.data);
      if (result.data.data.kanbanDetails) {
        setColumns(result.data.data.kanbanDetails);
      } else {
        setColumns([]);
      }
    } catch (err) {
      console.log(err);
    }
    setColumnsLoading(false);
  };

  const saveAllColumnState = async (kanbanColumns) => {
    try {
      await axios.put(apis.UPDATE_PROJECT, {
        kanbanDetails: { ...kanbanColumns },
        projectId: props.projectId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const createNewColumnHandler = () => {
    const newColumnId = uuid();
    const newColumnsUpdated = {
      ...columns,
      [newColumnId]: { columnName: newColumnName, tasks: [] },
    };

    setColumns({ ...newColumnsUpdated });

    saveAllColumnState({ ...newColumnsUpdated });
  };

  const createNewTaskHandler = (event) => {
    const {
      columnId,
      taskTitle,
      taskDescription,
      assigneeDetails,
      assignedByDetails,
    } = event;
    const newColumnsUpdated = {
      ...columns,
    };

    newColumnsUpdated[columnId]["tasks"].push({
      id: uuid(),
      taskTitle,
      taskDescription,
      assigneeDetails,
      assignedByDetails,
    });

    setColumns({ ...newColumnsUpdated });
    saveAllColumnState({ ...newColumnsUpdated });
  };

  useEffect(() => {
    fetchColumns();
  }, [props.Auth?.isLoggedIn, props?.projectId]);

  return (
    <div>
      <div className={classes.KanbanHeader}>
        <KanbanHeader Project={project} SetProject={setProject} />
      </div>

      <div className={classes.KanbanBody}>
        <div className={classes.DroppableBody}>
          {Object.keys(columns).length ? (
            <DragDropContext
              onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
              {Object.entries(columns).map(([columnId, column]) => {
                return (
                  <div className={classes.DroppableColumn} key={columnId}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={
                              snapshot.isDraggingOver
                                ? classes.DraggingOverColumn
                                : classes.DraggingNotOverColumn
                            }
                          >
                            <div className={classes.DroppableColumnName}>
                              <p>{column.columnName}</p>
                            </div>
                            <div
                              className={classes.AddTaskButton}
                              onClick={() => setShowCreateTaskModal(columnId)}
                            >
                              <span>+</span> Add new task
                            </div>
                            {showCreateTaskModal === columnId ? (
                              <div className={classes.CreateTaskModal}>
                                <CreateTaskModal
                                  columnId={columnId}
                                  Project={project}
                                  CloseBtn={createTaskModalHandler}
                                  createNewTaskHandler={createNewTaskHandler}
                                />
                              </div>
                            ) : null}

                            <div className={classes.TasksSection}>
                              {column.tasks.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            ...provided.draggableProps.style,
                                          }}
                                          className={
                                            snapshot.isDragging
                                              ? classes.TaskDragging
                                              : classes.TaskNotDragging
                                          }
                                        >
                                          {showTaskModal === item.id ? (
                                            <ShowTaskModal
                                              CloseBtn={showTaskModalHandler}
                                              Task={item}
                                            />
                                          ) : null}
                                          <p className={classes.TaskTitle}>
                                            {item.taskTitle}
                                          </p>

                                          <p className={classes.AssignedTo}>
                                            Assigned to:{" "}
                                            <span
                                              className={
                                                classes.AssignedToEmail
                                              }
                                            >
                                              {item.assigneeDetails.email
                                                ? item.assigneeDetails.email
                                                : "No One"}
                                            </span>
                                          </p>
                                          <div
                                            className={
                                              classes.MoreDetailsSection
                                            }
                                            onClick={() =>
                                              setShowTaskModal(item.id)
                                            }
                                          >
                                            more details
                                          </div>
                                        </div>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                            </div>
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                );
              })}
            </DragDropContext>
          ) : null}

          {isColumnLoading ? (
            <div className={classes.CreateColumnSection}>
              <i className="ui active centered inline big loader"></i>
            </div>
          ) : null}

          <div className={classes.CreateColumnSection}>
            <p>CREATE A NEW COLUMN</p>
            <input
              type="text"
              onChange={(event) => setNewColumnName(event.target.value)}
              placeholder="give a column name"
            />
            <div
              className={classes.CreateColumnButton}
              onClick={() => createNewColumnHandler()}
            >
              CREATE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanTable;
