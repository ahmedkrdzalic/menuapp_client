import React from 'react'
import { useNavigate } from "react-router-dom";


function MenuCard(props) {

    let navigate = useNavigate();

    if(props.add){
        //napravit da se moze kliknut i otvorit novi menu templejt u uredjivacu
        return(
            <div className="cursor-pointer text-teal-500 text-4xl basis-72 aspect-video shrink-0 rounded overflow-hidden hover:bg-gray-300 border-2 border-teal-500 justify-center text-center bg-gray-100 flex flex-col flex-wrap content-center max-h-64">
                <span className=''>+</span>
            </div>
        )
    }

  return (
      //prvo edit - ne link da bude nego 
    <div 
    key={props.menu.id} 
    className="text-slate-500 basis-72 aspect-video shrink-0 rounded overflow-hidden border-2 border-teal-500 justify-center text-center bg-gray-100 flex flex-col flex-wrap content-center max-h-64 relative ">
        <div className="px-6 py-4 break-words">
            <p className="font-bold text-xl mb-2">{props.menu.title}</p>
        </div>
        <div className='p-5'>

        </div>
        <div className="absolute bottom-0 right-0 flex flex-row flex-nowrap">
            <button 
            onClick={() => {navigate(`/editmenu/${props.menu.id}`)}} 
            className="inline-block bg-gray-200 hover:bg-gray-300 rounded px-2 py-1 text-sm font-semibold mr-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>

            <button className="inline-block bg-gray-200 hover:bg-gray-300 rounded px-2 py-1 text-sm font-semibold mr-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    </div>
  )
}

export default MenuCard