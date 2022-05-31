import React, { useEffect } from 'react'
import MenuItem from "../components/MenuItem"


function DisplayMenu(props) {

  useEffect(() => {
    
  }, []);
  
  if(!props.menu){
    return (
      <div>
        Not Found
      </div>
    )
  } else {



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
    <div className='min-h-screen w-full' style={{backgroundColor: props.menu.menuDATA.colors.bg_secondary}}>
        <div className='min-h-screen mx-auto lg:max-w-3xl md:px-3 py-3 px-2' style={{backgroundColor: props.menu.menuDATA.colors.bg_primary}}>
          <div>
            <div name="imageBox" className='mx-auto bg-no-repeat bg-center bg-contain aspect-square w-4/12' style={{backgroundImage: props.menu.menuDATA.logo !== "" && `url(http://localhost:3001/images/${props.menu.menuDATA.logo})`}}>

            </div>
          </div>
          <div className='flex flex-row flex-nowrap justify-start gap-3 overflow-x-scroll bg-inherit sticky top-0 px-1 py-2 z-50 '>
            {props.menu.menuDATA.category_names.map((category_name, categoryID) => {
              return (
                <button 
                onClick={() => handleScrollAnchorClick(categoryID)} 
                key={categoryID} 
                className='rounded-full hover:opacity-70 text-white px-4 py-1 whitespace-nowrap'
                style={{backgroundColor:props.menu.menuDATA.colors.general_text_color}}
                >
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
                    <span 
                    className='text-2xl font-medium sticky top-16 bg-inherit pr-4 pl-2 py-1 bg-opacity-30 border-b'
                    style={{color: props.menu.menuDATA.colors.general_text_color, borderColor:props.menu.menuDATA.colors.general_text_color}}
                    >{props.menu.menuDATA.category_names[categoryID]}</span>
                    <hr className='my-1'
                    style={{borderColor:props.menu.menuDATA.colors.general_text_color}}
                    />
                    {
                      category.map((item, itemID) => {
                        return (
                          <div key={itemID} className="mb-2">
                            <MenuItem item={item} currency={props.menu.menuDATA.currency} menu={props.menu} />
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

}

export default DisplayMenu