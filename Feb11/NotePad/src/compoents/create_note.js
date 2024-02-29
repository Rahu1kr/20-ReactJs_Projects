

const  CreateNode  =({TextHandel,SaveHandler,inputText})=>{

     const charlimit = 100;
     const charleft = charlimit - inputText.length

     return (<>
        <div className="note">
           <div className="my_note">
              <textarea col="10" rows="5" placeholder="Type...."  maxLength={100} 
               value={inputText} onChange={TextHandel}></textarea>
              <div className="note_footer">
                 <span> {charleft}Left</span>
                 <button className="note_save" onClick={SaveHandler}>Save</button>
              </div>
           </div>
        </div>
     </>)
}

export default CreateNode