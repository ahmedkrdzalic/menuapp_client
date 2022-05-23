import React from 'react'
import axios from 'axios';

function GeneralEdit(props) {
  return (
    <div >
        
        

        {/* Adding image for the menu */}
        <label className='text-sm text-gray-300 font-thin'>Menu Logo:</label>
        <input 
        type="file"
        className='block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:border-0
        file:text-sm file:font-semibold
        file:bg-teal-50 file:text-teal-700
        hover:file:bg-teal-100' 
        onChange={(e)=>{
            e.preventDefault();
            const formData = new FormData();
            formData.append("for", "logo");
            formData.append("image", e.target.files[0]);
            axios
                .post(`http://localhost:3001/menus/image-upload`, formData,
                {
                    headers: {
                    "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true
                })
                .then((response) => {
                    if(response.data.img_name){
                        var newMenu = {...props.props.menu};
                        axios
                            .delete(`http://localhost:3001/menus/image-delete/${newMenu.menuDATA.logo}`,
                            {
                                headers: {
                                "Content-Type": "application/json"
                                },
                                withCredentials: true
                            })
                            .then((res)=>{
                                newMenu.menuDATA.logo = response.data.img_name;
                                props.props.setMenu(newMenu);
                            })
                            .catch((res)=>{
                                newMenu.menuDATA.logo = response.data.img_name;
                                props.props.setMenu(newMenu);
                            })
                        
                    }else alert("Not able to upload!");
                })
                .catch((err) => {console.log(err)});
        }}/>
    </div>
  )
}

export default GeneralEdit