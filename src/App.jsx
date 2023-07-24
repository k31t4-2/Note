import './App.css'
import { useEffect, useState } from 'react';
import uuid from "react-uuid";

// below created by myself ----------------
import Main from './Components/Main';
import Sidebar from './Components/Sidebar';


function App() {

  // useState
  // onAddNoteが押されたらnotesにどんどん追加される
  // リロードボタンを押したら、全部情報が消えてしまうため、
  // リロード押した際に、ローカルストレージから情報を取ってくる記述をする必要がある
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")))
  const [activeNote,setActiveNote] = useState(false)

  // useEffect -----------------------
  // 今回はnotes配列の中身に変更が加わった時に、ローカルストレージに保存する
  // なので、第二引数にnotesを入れておく
  useEffect(() => {
    // ローカルストレージに保存する記述
    localStorage.setItem("notes",JSON.stringify(notes))
  }, [notes])

  // リロードした際に、一番上にあるノートが選択された状態を保持する
  // リロードした際にだけ発火する仕組みなので、第二引数の中身は空にする
  useEffect(() => {
    setActiveNote(notes[0].id)
  },[])

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "新しいnote",
      content:"",
      modDate:Date.now()
    }
    setNotes([...notes, newNote])
    console.log(notes);
  }

  const onDeleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id)
    setNotes(filterNotes);
  }

  const getActiveNote = () => {
    // アクティブになったノート（アクティブ＝選択された）を一つずつidで監視してる
    return notes.find((note) => note.id === activeNote)
  }

  // 修正された新しいノートの配列を返す。
  const onUpdatedNote = (updatedNote) => {
    const updatedNoteArray = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    })
    setNotes(updatedNoteArray);
  };

  return (
    <div className="App">
      <Sidebar
        onDeleteNote={onDeleteNote}
        onAddNote={onAddNote}
        notes={notes}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />

      <Main
        activeNote={getActiveNote()}
        onUpdatedNote={onUpdatedNote}
      />
    </div>
  )
}

export default App
