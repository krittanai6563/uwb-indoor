<template>


  <div class="badass-todo">

    <div class="titke has-text-centered mb-5">
      Test Todo
    </div>

    <form @submit.prevent="addtodo">

      <div class="field has-addons">
        <div class="control">
          <input v-model="newTodoContent" class="input" type="text" placeholder="Find a repository">
        </div>
        <div class="control">
          <button :disabled="!newTodoContent" class="button is-info">
            Add
          </button>
        </div>
      </div>


    </form>



    <div v-for="todo in todos" class="card mb-5" :class="{ 'has-background-success-light': todo.done }">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column" :class="{ 'has-text-success line-through': todo.done }">
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button class="button" @click="toggleDone(todo.id)" :class="todo.done ? 'is-success' : 'is-light'">
                &check;
              </button>
              <button @click="deleteTodo(todo.id)" class="button is-danger ml-2">
                &cross;
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script setup>

/*
import
*/

import { ref, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid';

import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'


const todos = ref([
  //   {
  //   id: 'id1',
  //   content: 'test1',
  //   done: false
  // },
  // {
  //   id: 'id2',
  //   content: 'test2',
  //   done: true
  // }
])

//get daat

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "test"))
  let fbTodos = []
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data())
    const todo ={
      id: doc.id,
      content: doc.data().content,
      done:doc.data().done
    }
    fbTodos.push(todo)
  })
   todos.value = fbTodos
})

// add todo
const newTodoContent = ref('')

const addtodo = () => {
  // console.log('add todo')
  const newTodo = {
    id: uuidv4(),
    content: newTodoContent.value,
    done: false
  }
  // console.log('NewTodo:',newTodo)
  todos.value.unshift(newTodo)
  newTodoContent.value = ''
}
//delete todo

const deleteTodo = id => {
  todos.value = todos.value.filter(todo => todo.id !== id)
}


//toggle done
const toggleDone = id => {
  const index = todos.value.findIndex(todo => todo.id === id)
  todos.value[index].done = !todos.value[index].done
}

</script>


<style>
@import 'bulma/css/bulma.min.css';

.badass-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.line-through {
  text-decoration: line-through;
}
</style>

