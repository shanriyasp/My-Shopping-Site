import item1 from '../../images/item1.jpg'
import item2 from '../../images/item2.jpg'
import item3 from '../../images/item3.jpg'
import item4 from '../../images/item4.jpg'
import item5 from '../../images/item5.jpg'
import item6 from '../../images/item6.jpg'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {id:1,title:'Red Planet', desc: "Jim Marlow and his strange-looking Martian friend Willis were allowed to travel only so far. But one day Willis unwittingly tuned into a treacherous plot that threatened all the colonists on Mars, and it set Jim off on a terrfying adventure that could save--or destroy--them all!", price:110,img:item1},
        {id:2,title:'The Mission House', desc: "Fleeing his demons and the dark undercurrents of life in Britain, Hilary Byrd takes refuge in a south Indian mission house next door to the presbytery where the Padre and his adoptive daughter, Priscilla, live. As Hilary's friendship with Priscilla grows, so too do the religious and nationalist tensions around them, and the mission house may not be the safe haven it seems. Meticulously crafted and tenderly subversive, The Mission House is a deeply human story of the wonders and terrors of connection in a modern world.", price:80,img: item2},
        {id:3,title:'The Redemption of Galen Pike', desc: "In a remote Australian settlement a young wife with an untellable secret reluctantly invites her neighbour into her home. A Quaker spinster offers companionship to a condemned man in a Colorado jail. In the ice and snows of Siberia an office employee from Birmingham witnesses a scene that will change her life. At a jubilee celebration in a northern English town a middle-aged alderman opens his heart to Queen Victoria. A teenage daughter leaves home in search of adventure. High in the Cumbrian fells a woman seeks help from her father's enemy. Spare, precise, charged with a prickly wit, the stories in Carys Davies's sparkling second collection remind us how little we know of the lives of others.",price:120,img: item3},
        {id:4,title:'Pride and Prejudice', desc: "Set in England in the early 19th century, Pride and Prejudice tells the story of Mr and Mrs Bennet's five unmarried daughters after the rich and eligible Mr Bingley and his status-conscious friend, Mr Darcy, have moved into their neighbourhood. While Bingley takes an immediate liking to the eldest Bennet daughter, Jane, Darcy has difficulty adapting to local society and repeatedly clashes with the second-eldest Bennet daughter, Elizabeth.", price:260,img:item4},
        {id:5,title:'The Stranger On The Train', desc: "A mother’s worst nightmare: the subway doors close with her baby son still on the train. In this suspenseful debut novel, a woman goes to unimaginable lengths to get her child back.", price:160,img: item5},
        {id:6,title:'Witch At Last', desc: "A lot has changed for Jinx Hamilton in just a few months. After the mishaps that befell her in Witch At Odds, Jinx just wants to enjoy the rest of the summer, but she's not going to be that lucky. Just as she's poised to tell her friends she's a witch, secrets start popping out all over the place. Between old foes and new locations, Jinx isn't going to get her peaceful summer, but she may just get an entirely different world.",price:90,img: item6}
    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
        
    
    if(action.type === ADD_TO_CART){
       let addedItem = state.items.find(item=> item.id === action.id)
       let existed_item= state.addedItems.find(item=> action.id === item.id)
       if(existed_item)
       {
          addedItem.quantity += 1 
           return{
              ...state,
               total: state.total + addedItem.price 
                }
      }
       else{
          addedItem.quantity = 1;
          let newTotal = state.total + addedItem.price 
          
          return{
              ...state,
              addedItems: [...state.addedItems, addedItem],
              total : newTotal
          }
          
      }
  }
  if(action.type === REMOVE_ITEM){
      let itemToRemove= state.addedItems.find(item=> action.id === item.id)
      let new_items = state.addedItems.filter(item=> action.id !== item.id)
      let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
      console.log(itemToRemove)
      return{
          ...state,
          addedItems: new_items,
          total: newTotal
      }
  }
  if(action.type=== ADD_QUANTITY){
      let addedItem = state.items.find(item=> item.id === action.id)
        addedItem.quantity += 1 
        let newTotal = state.total + addedItem.price
        return{
            ...state,
            total: newTotal
        }
  }
  if(action.type=== SUB_QUANTITY){  
      let addedItem = state.items.find(item=> item.id === action.id) 
      if(addedItem.quantity === 1){
          let new_items = state.addedItems.filter(item=>item.id !== action.id)
          let newTotal = state.total - addedItem.price
          return{
              ...state,
              addedItems: new_items,
              total: newTotal
          }
      }
      else {
          addedItem.quantity -= 1
          let newTotal = state.total - addedItem.price
          return{
              ...state,
              total: newTotal
          }
      }
      
  }

  if(action.type=== ADD_SHIPPING){
        return{
            ...state,
            total: state.total + 6
        }
  }

  if(action.type=== 'SUB_SHIPPING'){
      return{
          ...state,
          total: state.total - 6
      }
}
  
else{
  return state
  }

}

export default cartReducer;
