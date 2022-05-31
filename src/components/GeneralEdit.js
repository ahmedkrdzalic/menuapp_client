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

        <div className='flex flex-col my-3'>
            <label className='text-md text-gray-300 '>Color Settings:</label>
            <div className='flex justify-between items-center ml-2 my-1'>
                <label className='text-sm text-gray-300 font-thin'>General Text Color:</label>
                <input 
                type="color" 
                value={props.props.menu.menuDATA.colors.general_text_color} 
                onChange={(e)=>{
                    var newMenu = {...props.props.menu};
                    newMenu.menuDATA.colors.general_text_color = e.target.value;
                    props.props.setMenu(newMenu);
                }} />
            </div>
            <div className='flex justify-between items-center ml-2 my-1'>
                <label className='text-sm text-gray-300 font-thin'>Primary Background Color:</label>
                <input 
                type="color" 
                value={props.props.menu.menuDATA.colors.bg_primary} 
                onChange={(e)=>{
                    var newMenu = {...props.props.menu};
                    newMenu.menuDATA.colors.bg_primary = e.target.value;
                    props.props.setMenu(newMenu);
                }} />
            </div>
            <div className='flex justify-between items-center ml-2 my-1'>
                <label className='text-sm text-gray-300 font-thin'>Secondary Background Color:</label>
                <input 
                type="color" 
                value={props.props.menu.menuDATA.colors.bg_secondary} 
                onChange={(e)=>{
                    var newMenu = {...props.props.menu};
                    newMenu.menuDATA.colors.bg_secondary = e.target.value;
                    props.props.setMenu(newMenu);
                }} />
            </div>
            <div className='flex justify-between items-center ml-2 my-1'>
                <label className='text-sm text-gray-300 font-thin'>Item Primary Text Color:</label>
                <input 
                type="color" 
                value={props.props.menu.menuDATA.colors.item_primary_text_color} 
                onChange={(e)=>{
                    var newMenu = {...props.props.menu};
                    newMenu.menuDATA.colors.item_primary_text_color = e.target.value;
                    props.props.setMenu(newMenu);
                }} />
            </div>
            <div className='flex justify-between items-center ml-2 my-1'>
                <label className='text-sm text-gray-300 font-thin'>Item Secondary Text Color:</label>
                <input 
                type="color" 
                value={props.props.menu.menuDATA.colors.item_secondary_text_color} 
                onChange={(e)=>{
                    var newMenu = {...props.props.menu};
                    newMenu.menuDATA.colors.item_secondary_text_color = e.target.value;
                    props.props.setMenu(newMenu);
                }} />
            </div>
            <div className='flex justify-between items-center ml-2 my-1'>
                <label className='text-sm text-gray-300 font-thin'>Item Background Color:</label>
                <input 
                type="color" 
                value={props.props.menu.menuDATA.colors.item_bg_color} 
                onChange={(e)=>{
                    var newMenu = {...props.props.menu};
                    newMenu.menuDATA.colors.item_bg_color = e.target.value;
                    props.props.setMenu(newMenu);
                }} />
            </div>
        </div>
        
    </div>
  )
}

export default GeneralEdit