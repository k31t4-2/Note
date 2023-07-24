/* eslint-disable react/prop-types */
import "./css/Sidebar.css";

const Sidebar = (props) => {

  // eslint-disable-next-line react/prop-types
  const {
    onDeleteNote,
    onAddNote,
    notes,
    activeNote,
    setActiveNote
  } = props


  // notesを日付が新しい順に並べる
  const sortedNotes = notes.sort((a,b) => b.modDate - a.modDate)

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h1 className="sidebar__header-ttl">NOTE</h1>
        <button className="btn sidebar__header-btn" onClick={onAddNote}>追加</button>
      </div>

      <div className="sidebar__content">
          {sortedNotes.map((note) => (
            <div
              key={note.id}
              // trueになったnote.id と activeNoteが等しい時に.activeが活性化される（onClickでクリックされたコンテンツは必ずtrueになる設定にしているので必ず.activeが活性化される）
              className={`${note.id === activeNote && "active"} sidebar__content-wrap`}
              // クリックされたらactiveNoteがtrueになる
              onClick={() => setActiveNote(note.id)}
            >
                <div className="sidebar__content-ttl">
                  <h3>{note.title}</h3>
                  <button onClick={() => onDeleteNote(note.id)} className="btn sidebar__content-btn">Delete</button>
                </div>

                <p className="sidebar__content-txt">
                  {note.content}
                </p>
                <small className="sidebar__content-date">
                最後の修正日:{new Date(note.modDate).toLocaleDateString("ja-JP", {
                    hour:"2-digit",
                    minute:"2-digit",
                  })}
                </small>
              </div>
          ))}
      </div>

    </div>
  )
}

export default Sidebar
