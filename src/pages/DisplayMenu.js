import React, {useRef, useEffect} from 'react'
import MenuItem from "../components/MenuItem"
import TestComponent from "../components/TestComponent"


function DisplayMenu(props) {
  
  //idk really how it works
  const refs = props.menu.menuDATA.category_names.reduce((acc, value, i) => {
    console.log(i);
    acc[i] = React.createRef();
    return acc;
  }, {});

  const handleScrollAnchorClick = id =>
    refs[id].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });



    //koristiti props.menu i display all data here an dit will update automatically.
  return (
    <div className='w-full bg-gray-300 '>
        <div className='mx-auto sm:max-w-3xl max-w-md py-3 px-7 bg-gray-100'>
          <div name="logo" className='aspect-video w-4/12 mx-auto bg-gray-200 my-3'>
            <div className=''>
              
            </div>
          </div>
          <div className='flex flex-row flex-nowrap justify-start gap-3 overflow-x-auto sticky top-0 bg-inherit px-1 py-2 z-50 drop-shadow-lg'>
            {props.menu.menuDATA.category_names.map((category_name, categoryID) => {

              return (
                <button onClick={() => handleScrollAnchorClick(categoryID)} key={categoryID} className='rounded-full bg-teal-200 px-4 py-1 whitespace-nowrap'>
                  {category_name}
                </button>
              )
            })}
          </div>
          
          <div className='flex flex-col mt-3'>
            {
              props.menu.menuDATA.categories.map((category, categoryID) => {
                return (
                  <div ref={refs[categoryID]} key={categoryID} className="mt-3">
                    <span className='text-2xl font-medium text-gray-600'>{props.menu.menuDATA.category_names[categoryID]}</span>
                    <hr className='mb-2 border-gray-300' />
                    {
                      category.map((item, itemID) => {
                        return (
                          <div key={itemID} className="mb-2">
                            <MenuItem item={item} currency={props.menu.menuDATA.currency}/>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
    </div>
  )
}

export default DisplayMenu