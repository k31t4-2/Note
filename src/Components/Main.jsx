/* eslint-disable react/prop-types */
import "./css/Main.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Main = (props) => {

  // eslint-disable-next-line react/prop-types, no-unused-vars
  const {activeNote,onUpdatedNote} = props

  if (!activeNote) {
    // !activeNote === false。最初は何も選択されていないので、下記が表示される。
    return <div className="noActiveNote">ノートが選択されていません。</div>
  }

  const onEditNote = (key,value) => {
    onUpdatedNote({
      ...activeNote,
      [key]: value, //[key]にすることで、動的なkeyになりtitle or contentで判定できる
      modDate:Date.now()
    })
  }


  return (
    <>
      <div className="main">
        <div className="main__edit">
          <input
            onChange={(e) => onEditNote("title",e.target.value)}
            value={activeNote.title}
            type="text"
            className="main__edit-input"
            />
          <textarea
            onChange={(e) => onEditNote("content",e.target.value)}
            value={activeNote.content}
            className="main__edit-text"
            placeholder="ノートの内容を記入"
          ></textarea>
        </div>

        <div className="main__preview">
          <h2 className="main__preview-ttl">{activeNote.title}</h2>
          <ReactMarkdown className="main__preview-content">
            {activeNote.content}
          </ReactMarkdown>
        </div>
      </div>
    </>
  )
}

export default Main
