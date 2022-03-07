app.component('todo-list', {
   template: 
      `
         <div id='todoListComponent'>
            <h5>Tasks</h5>
            <input class='inputTodoList' type='text' v-model='inputText' @keyup.enter='addTextToList' placeholder='Task'>
            <button @click='addTextToList'>Add</button>
            
            <div class='todoList'>
               <div @click='removeList(index)' key='t.id' v-for='(t, index) in todoList'>
                  <p>{{t}}</p>
               </div>

            </div>
         </div>
      `,
   data(){
       return {
          inputText: '',
          todoList: []
       };
   },
   methods: {
      addTextToList(){
         if(this.inputText && this.inputText.trim()){
            this.todoList.push(this.inputText.trim());
            this.inputText = '';
         }
      },
      removeList(index){
         if(index >= 0 && index < this.todoList.length){
            this.todoList.splice(index, 1);
         }
      }
   }
});