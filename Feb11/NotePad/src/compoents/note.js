


const Note = ({id,text,deleteHandel})=>{

      return(<>
          <div className="note"> 
            
              <div>{text}</div>

              <button className="del_btn" onClick={()=> deleteHandel(id)}>Delete</button>
          </div>
      </>)
}

export default Note