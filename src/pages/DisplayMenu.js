import React from 'react'
import MenuItem from "../components/MenuItem"


function DisplayMenu(props) {
  
  //idk really how it works for now
  const refs = props.menu.menuDATA.category_names.reduce((acc, value, i) => {
    acc[i] = React.createRef();
    return acc;
  }, {});

  const handleScrollAnchorClick = id =>
    refs[id].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });



  return (
    <div className='min-h-screen w-full bg-gray-300 '>
        <div className='min-h-screen mx-auto sm:max-w-3xl max-w-md py-3 px-7 bg-gray-100'>
          <div>
            <div name="imageBox" className='mx-auto bg-no-repeat bg-center bg-contain aspect-square w-4/12' style={{backgroundImage:`url(http://localhost:3001/images/${props.menu.menuDATA.logo})`}}>

            </div>
          </div>
          <div className='flex flex-row flex-nowrap justify-start gap-3 overflow-x-auto bg-inherit sticky top-0 px-1 py-2 z-50 '>
            {props.menu.menuDATA.category_names.map((category_name, categoryID) => {
              return (
                <button onClick={() => handleScrollAnchorClick(categoryID)} key={categoryID} className='rounded-full bg-teal-500 hover:bg-teal-400 text-white px-4 py-1 whitespace-nowrap'>
                  {category_name}
                </button>
              )
            })}
          </div>
          
          <div className='flex flex-col mt-3 bg-inherit'>
            {
              props.menu.menuDATA.categories.map((category, categoryID) => {
                return (
                  <div ref={refs[categoryID]} key={categoryID} className="mt-3 bg-inherit">
                    <span className='text-2xl font-medium text-teal-500 sticky top-12 bg-inherit pr-4 pl-2 py-1 bg-opacity-30 border-teal-500 border-b'>{props.menu.menuDATA.category_names[categoryID]}</span>
                    <hr className='my-1 border-teal-500' />
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