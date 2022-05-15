import React from 'react'
import { useNavigate } from "react-router-dom";


function MenuCard(props) {

    let navigate = useNavigate();

    if(props.add){
        //napravit da se moze kliknut i otvorit novi menu templejt u uredjivacu
        return(
            <div className="text-slate-500 basis-64 shrink-0 rounded overflow-hidden hover:border-4 hover:bg-teal-50 border-2 border-teal-500 justify-center text-center bg-gray-100 flex flex-col flex-wrap content-center max-h-64">
                <span className='text-teal-500 text-4xl'>+</span>
            </div>
        )
    }

  return (
      //prvo edit - ne link da bude nego 
    <div 
    key={props.menu.id} 
    className="text-slate-500 basis-64 shrink-0 rounded overflow-hidden border-2 border-teal-500 justify-center text-center bg-gray-100 flex flex-col flex-wrap content-center max-h-64 relative">
        <div className="px-6 py-4 break-words">
            <p className="font-bold text-xl mb-2">{props.menu.title}</p>
        </div>
        <div className='p-5'>

        </div>
        <div className="absolute bottom-0 right-0 flex flex-row flex-nowrap">
            <button 
            onClick={() => {navigate(`/editmenu/${props.menu.id}`)}} 
            className="inline-block bg-gray-200 hover:bg-gray-300 rounded px-2 py-1 text-sm font-semibold mr-2 mb-2">
                EDIT
            </button>
            <button className="inline-block bg-gray-200 hover:bg-gray-300 rounded px-2 py-1 text-sm font-semibold mr-2 mb-2">DELETE</button>
        </div>
    </div>
  )
}

export default MenuCard