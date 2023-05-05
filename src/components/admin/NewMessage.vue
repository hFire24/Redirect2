<script setup>
import { ref } from 'vue';
import { addDoc } from 'firebase/firestore';
import { dbMessagesRef } from "../../firebase";
import useAuth from '../../composables/useAuth';
const { userIsAdmin } = useAuth();

const showNewMessage = ref(true)

const newMessage = ref({
    text: 'This website is blocked.',
    enabled: true
});

async function add() {
    try {
        if(!userIsAdmin) {
            alert("You can't do this")
            return;
        }
        if(newMessage.value.text === "") {
            alert("You can't submit a message without text.")
            return;
        }
        await addDoc(dbMessagesRef, newMessage.value);
        alert(`${newMessage.value.text} has been added!`);
    }
    catch(e) {
        console.log(e);
        alert("There was an error adding the message...");
    }
}
</script>

<template>
    <section class="admin_section">
        <header class="admin_section_header">
            <h3>Add New Message</h3>
            <small class="toggleBtn" @click="showNewMessage = !showNewMessage">{{ showNewMessage ? "Hide" : "Show" }}</small>
        </header>
        <form v-show="showNewMessage">
            <div class="form_group">
                <label for="text">Message Text</label>&nbsp;
                <input type="text" id="text" v-model.trim="newMessage.text">
            </div>
            <div class="form_group">
                <button @click.prevent="add" class="green">Add</button>
            </div>
        </form>
    </section>
</template>