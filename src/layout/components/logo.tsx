import {defineComponent} from 'vue'
import {SYSTEM_NAME} from '@/config/index.ts'
import '../style/logo.css'

import {useSystemStore} from '@/store/modules/system';
export default defineComponent({
 


  setup(props) {

    const systemStore =  useSystemStore();
    return{
      systemStore,
    }
    
  },
  render(){
    return <div className="left-logo">
     
        <img src="/vite.svg" alt="logo" width="32" height="32" className='logo'></img>
       
        {!this.systemStore.collapse ? <div className='title' >{SYSTEM_NAME}</div> :""}
    </div>
  }
})