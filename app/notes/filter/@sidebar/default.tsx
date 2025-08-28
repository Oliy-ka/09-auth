import SidebarNotes from "./SidebarNotes";

const NotesSidebar = async () => {
    const tags = ["Work", "Personal", "Meeting", "Shopping", "Todo"];
    return(
    <div>
      {<SidebarNotes tags={tags} />}
    </div>
    );
};

export default NotesSidebar;