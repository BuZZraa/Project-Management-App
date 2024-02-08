import { useState } from "react";
import NewProject from "./components/Project/NewProject.jsx";
import NoProjectSelected from "./components/Project/NoProjectSelected.jsx";
import ProjectSidebar from "./components/Project/ProjectSidebar.jsx";
import SelectedProject from "./components/Project/SelectedProject.jsx";

function App() {
  const [projectsState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {
    setProjectState((prevProjectsState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevProjectsState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevProjectsState,
        tasks: [...prevProjectsState.tasks, newTask]
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        tasks: projectsState.tasks.filter(
          ((task) => task.id !== id)
        ),
      };
    });
  }

  function handleSelectProject(id) {
    setProjectState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: null,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState((prevProjectsState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
        projects: [...prevProjectsState.projects, newProject],
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleDeleteProject() {
    setProjectState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
        projects: projectsState.projects.filter(
          (project) => project.id !== prevProjectsState.selectedProjectId
        ),
        tasks:prevProjectsState.tasks.filter(
          (task) => task.projectId !== prevProjectsState.selectedProjectId)
      };
    });
  }
  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  const selectedProjectTasks = projectsState.tasks.filter(task => task.projectId === projectsState.selectedProjectId);

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={selectedProjectTasks}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
