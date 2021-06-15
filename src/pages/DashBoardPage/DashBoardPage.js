import React, { useState } from "react";
import Layout from "../../hoc/Layout/Layout";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import KanbanTable from "../../components/KanbanTable/KanbanTable";
import classes from "./DashBoardPage.module.css";

const DashBoardPage = (props) => {
  const projectId = props.match.params.projectId;

  return (
    <Layout>
      <KanbanTable projectId={projectId} />
    </Layout>
  );
};

export default DashBoardPage;
