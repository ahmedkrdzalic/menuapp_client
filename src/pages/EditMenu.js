import React, { useState, useEffect} from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { INITIAL_MENU } from '../helpers/InitialMenu';
import DisplayMenu from './DisplayMenu';
import GeneralEdit from '../components/GeneralEdit';


function EditMenu() {
    let { id } = useParams();

    const[menu, setMenu] = useState(INITIAL_MENU);
    const[category_id, setCategory_id] = useState(0);
    const[item_id, setItem_id] = useState(0);

    //about form for adding category  
    const[addCategoryFormIsOpen, setAddCategoryFormIsOpen] = useState(false);
    const[addCategoryName, setAddCategoryName] = useState("");

    //about form for adding item  
    const[addItemFormIsOpen, setAddItemFormIsOpen] = useState(false);
    const[addItemName, setAddItemName] = useState("");

    //is the form fro general settings open or closed
    const[generalSettingsFormIsOpen, setGeneralSettingsFormIsOpen] = useState(false);

    const[successfullySavedMenu, setSuccessfullySavedMenu] = useState(false);



    useEffect(() => {
        axios.get(`http://localhost:3001/menus/${id}`, {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
            })
            .then((response) => {
                setMenu(response.data)
            }
        );
    }, [id]);

    useEffect(() => {
        setSuccessfullySavedMenu(false);
    }, [menu])



    //radio button for categories
    function onChangeValue_category_id(e) {
        setCategory_id(e.target.value);
        setItem_id(0);
    }

    //radio button for items
    function onChangeValue_item_id(e) {
        setItem_id(e.target.value);
    }

    function onSubmitAddCategory(e){
        e.preventDefault();
        var newMenu = {...menu};
        var newCategory_names = [...newMenu.menuDATA.category_names, addCategoryName];
        newMenu.menuDATA.category_names = newCategory_names;

        //var newCategoryToAdd = INITIAL_MENU.menuDATA.categories[0];

        var newCategoryToAdd = [
                                    {
                                        title: "Initial Item",
                                        description: "Test Description Test Description",
                                        price: 3,
                                        img: ""
                                    }
                                ]
                                
        var newCategories = [...newMenu.menuDATA.categories, newCategoryToAdd];
        newMenu.menuDATA.categories = newCategories;

        setMenu(newMenu);
    }

    function onSubmitAddItem(e){
        e.preventDefault();
        var newMenu = {...menu};

        // not working like in comments, u have to iterate through array, not directly 
        //var newItemToAdd = INITIAL_MENU.menuDATA.categories[0][0];
        //newItemToAdd.title = addItemName;

        var newItemToAdd =
            {
                title: addItemName,
                description: "Test Description",
                price: 3,
                img: ""
            }
        var newItems = [...newMenu.menuDATA.categories[category_id], newItemToAdd];
        console.log(newItems);
        newMenu.menuDATA.categories[category_id] = newItems;

        setMenu(newMenu);
    }

    function onClickDeleteCategory(e) {
        var newMenu = {...menu};
        if(newMenu.menuDATA.category_names.length > 1){
            newMenu.menuDATA.category_names.splice(e.target.value, 1);
            newMenu.menuDATA.categories.splice(e.target.value, 1);
            setCategory_id(0);
            setItem_id(0);
        }else {
            alert("You must have at least one CATEGORY in the MENU.");
        }
        console.log(newMenu);
        setMenu(newMenu);
    }

    function onClickDeleteItem(IDs) {
        var newMenu = {...menu};
        if(newMenu.menuDATA.categories[IDs.cat_id].length > 1){
            newMenu.menuDATA.categories[IDs.cat_id].splice(IDs.item_id, 1);
            setItem_id(0);
        }else {
            alert("You must have at least one ITEM in the CATEGORY.");
        }

        setMenu(newMenu);
    }

    function onClickSaveMenu(){
        axios.put(`http://localhost:3001/menus/${menu.id}`, menu, {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
            })
            .then((res)=>{
                if(res.data.msg === "SUCCESS"){
                    setSuccessfullySavedMenu(true);
                }
            })
            .catch((error)=>{
                setSuccessfullySavedMenu(false);
            })
    }




  return (
    <div className='relative'>
        <div className='text-gray-100 float-left h-screen max-h-screen overflow-auto w-72 p-2 border-r-2 border-solid border-gray-400 bg-gray-900'>
            <div className='flex justify-between items-end'>
                <div><label className='text-md text-gray-300 font-thin'>Menu: </label><span className='text-2xl font-bold text-gray-100'>{menu.title}</span></div>
                <div className='flex flex-row items-center'>
                    {successfullySavedMenu && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>}
                    <button 
                        onClick={(e)=>{
                            e.preventDefault();
                            onClickSaveMenu();
                        }} 
                        className='px-3 py-1 bg-teal-500 rounded text-white'
                    >
                        Save
                    </button>
                </div>
                
            </div>
            <hr className='border-gray-500 pb-3' />

            {/* GENERAL SETTINGS */}
            <div name="everything about General settings">
                <button className='w-full flex justify-between hover:bg-gray-800 hover:cursor-pointer' onClick={()=>{if(generalSettingsFormIsOpen)setGeneralSettingsFormIsOpen(false); else setGeneralSettingsFormIsOpen(true)}}>
                    <label className='text-md text-gray-300 font-thin'>GENERAL SETTINGS </label>
                    {
                        generalSettingsFormIsOpen
                        ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                        
                    }
                </button>
                {
                    generalSettingsFormIsOpen && 
                    <GeneralEdit props={{setMenu:setMenu, menu: menu, category_id:category_id, item_id:item_id}} />
                }

                <hr className='border-gray-500 pb-3 mt-3' />
            </div>



            {/* DISPLAY CATEGORIES */}
            <label className='text-md text-gray-300 font-thin'>Categories: </label>
            <div className='flex flex-col' >
                <div className='flex flex-col space-y-px mt-2' onChange={(e) => {onChangeValue_category_id(e)}}>
                    {menu.menuDATA.category_names.map((category_name, id) => {
                        return (
                            <>
                                <input type="radio" id={id + "category"} value={id} className='' name="category_name" hidden ></input>
                                <label className="flex justify-between px-3 py-1 bg-gray-700 rounded-sm hover:bg-gray-600" htmlFor={id + "category"} >
                                    <span className=''>{category_name}</span>
                                    <button onClick={(e)=>{onClickDeleteCategory(e)}} value={id} className='text-red-700 hover:text-red-300 bg-transparent px-2'>x</button>
                                </label>
                            </>
                        )
                    } )}
                </div>
                <button onClick={()=>{if(addCategoryFormIsOpen)setAddCategoryFormIsOpen(false); else setAddCategoryFormIsOpen(true)}} className="mt-px cursor-pointer text-center px-3 py-1 bg-gray-700 rounded-sm hover:bg-gray-600 text-gray-500 hover:text-gray-300 font-bold " >
                    +
                </button>
                {
                    addCategoryFormIsOpen &&
                    <form className='flex flex-col space-y-px mt-2' onSubmit={onSubmitAddCategory}>
                        <label className='text-sm text-gray-300 font-thin my-2'>category name:</label>
                        <input 
                        type="text"
                        className='text-gray-500 px-2 py-1' 
                        value={addCategoryName} 
                        onChange={(e)=>{setAddCategoryName(e.target.value)}} />
                        <input type='submit' className="cursor-pointer text-center px-3 py-1 bg-gray-700 rounded-sm hover:bg-gray-600 text-gray-500 hover:text-gray-300 " />
                    </form>
                }
            </div>
            <hr className='border-gray-600 mb-3 mt-5' />
            {/* DISPLAY ITEMS */}
            <label className='text-md text-gray-300 font-thin'>Items: </label>
            <div className='flex flex-col'>
                <div className='flex flex-col space-y-px mt-2'  onChange={(e) => {onChangeValue_item_id(e)}}>
                    {menu.menuDATA.categories[category_id].map((item, id) => {
                        return (
                            <>
                                <input type="radio" id={id + "item"} value={id} className='' name="category_item" hidden></input>
                                <label className="flex justify-between px-3 py-1 bg-gray-700 rounded-sm hover:bg-gray-600" htmlFor={id + "item"} >
                                    <span className=''>{item.title}</span>
                                    <button onClick={(e)=>{onClickDeleteItem({item_id:id, cat_id:category_id});}} className='text-red-700 hover:text-red-300 bg-transparent px-2'>x</button>
                                </label>
                            </>
                        )
                    } )}
                </div>
                <button onClick={()=>{if(addItemFormIsOpen)setAddItemFormIsOpen(false); else setAddItemFormIsOpen(true)}} className="mt-px cursor-pointer text-center px-3 py-1 bg-gray-700 rounded-sm hover:bg-gray-600 text-gray-500 hover:text-gray-300 font-bold " >
                    +
                </button>
                {
                    addItemFormIsOpen &&
                    <form className='flex flex-col space-y-px mt-2' onSubmit={onSubmitAddItem}>
                        <label className='text-sm text-gray-300 font-thin my-2'>item name:</label>
                        <input 
                        type="text"
                        className='text-gray-500 px-2 py-1' 
                        value={addItemName} 
                        onChange={(e)=>{setAddItemName(e.target.value)}} />
                        <input type='submit' className="cursor-pointer text-center px-3 py-1 bg-gray-700 rounded-sm hover:bg-gray-600 text-gray-500 hover:text-gray-300 " />
                    </form>
                }
            </div>
            <hr className='border-gray-600 mb-3 mt-5' />
            {/* EDIT CONTENT */}
            <label className='text-md text-gray-300 font-thin'>Edit Content: </label>
            <div className='flex flex-col space-y-px mt-2'>
                <label className='text-sm text-gray-300 font-thin'>title:</label>
                <input 
                className='text-gray-500 px-2 py-1' 
                value={menu.menuDATA.categories[category_id][item_id].title} 
                onChange={(e)=>{
                    var newMenu = {...menu};
                    newMenu.menuDATA.categories[category_id][item_id].title = e.target.value;
                    setMenu(newMenu);
                }}/>

                <label className='text-sm text-gray-300 font-thin'>description:</label>
                <input 
                className='text-gray-500 px-2 py-1' 
                value={menu.menuDATA.categories[category_id][item_id].description} 
                onChange={(e)=>{
                    var newMenu = {...menu};
                    newMenu.menuDATA.categories[category_id][item_id].description = e.target.value;
                    setMenu(newMenu);
                }}/>
                
                <label className='text-sm text-gray-300 font-thin'>price:</label>
                <input 
                className='text-gray-500 px-2 py-1' 
                value={menu.menuDATA.categories[category_id][item_id].price} 
                onChange={(e)=>{
                    var newMenu = {...menu};
                    newMenu.menuDATA.categories[category_id][item_id].price = e.target.value;
                    setMenu(newMenu);
                }}/>

                {/* Adding image for an item */}
                <label className='text-sm text-gray-300 font-thin'>image:</label>
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
                    formData.append("for", "item");
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
                                var newMenu = {...menu};
                                axios
                                    .delete(`http://localhost:3001/menus/image-delete/${newMenu.menuDATA.categories[category_id][item_id].img}`,
                                    {
                                        headers: {
                                        "Content-Type": "application/json"
                                        },
                                        withCredentials: true
                                    })
                                    .then((res)=>{
                                        newMenu.menuDATA.categories[category_id][item_id].img = response.data.img_name;
                                        setMenu(newMenu);
                                    })
                                    .catch((res)=>{
                                        newMenu.menuDATA.categories[category_id][item_id].img = response.data.img_name;
                                        setMenu(newMenu);
                                    });
                                
                            }else alert("Not able to upload!");
                        })
                        .catch((err) => {console.log(err)});
                }}/>
                
            </div>

        </div>
        <div className='block overflow-hidden overflow-y-auto max-h-screen'>
            <DisplayMenu menu={menu} />
        </div>

        
    </div>


  )
}

export default EditMenu