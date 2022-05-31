import React from 'react'

function MenuItem(props) {
  return (
    <div 
    className='flex flex-row flex-nowrap p-2 bg-gray-300'
    style={{backgroundColor:props.menu.menuDATA.colors.item_bg_color}}
    >
        <div name="imageBox" className='bg-no-repeat bg-center bg-cover aspect-video w-4/12 bg-gray-200' style={{backgroundImage: props.item.img!=="" && `url(http://localhost:3001/images/${props.item.img})`}}>
          
        </div>
        <div name="textBox" className='flex flex-col w-8/12 px-3 relative '>
            <span 
            className='text-2xl font-bold mb-1 mx-1'
            style={{color:props.menu.menuDATA.colors.item_primary_text_color}}
            >{props.item.title}</span>
            <hr className='' />
            <p 
            className='my-1'
            style={{color:props.menu.menuDATA.colors.item_secondary_text_color}}
            >
                {props.item.description}
            </p>
            <span 
            className='text-2xl font-normal mb-1 mx-1 absolute bottom-0 right-0'
            style={{color:props.menu.menuDATA.colors.item_secondary_text_color}}
            >{props.item.price} {props.currency}</span>

        </div>
    </div>
  )
}

export default MenuItem