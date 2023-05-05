<script setup>
import { ref } from 'vue';
import { addDoc } from 'firebase/firestore';
import { dbBreaksRef } from "../../firebase";
import useAuth from '../../composables/useAuth';
const { userIsAdmin } = useAuth();

const showNewBreak = ref(true)

const newBreak = ref({
    text: 'Guru Meditation',
    link: '',
    category: 'misc',
    short: true,
    mobile: true,
    lazy: true,
    stand: false,
    enabled: true
});

async function add() {
    try {
        if(!userIsAdmin) {
            alert("You can't do this")
            return;
        }
        if(newBreak.value.text === "") {
            alert("You can't submit a break without text.")
            return;
        }
        await addDoc(dbBreaksRef, newBreak.value);
        alert(`${newBreak.value.text} has been added!`);
    }
    catch(e) {
        console.log(e);
        alert("There was an error adding the break...");
    }
}
</script>

<template>
    <section class="admin_section">
        <header class="admin_section_header">
            <h3>Add New Break</h3>
            <small class="toggleBtn" @click="showNewBreak = !showNewBreak">{{ showNewBreak ? "Hide" : "Show" }}</small>
        </header>
        <form v-show="showNewBreak">
            <div class="form_group">
                <label for="text">Break Text</label>&nbsp;
                <input type="text" id="text" v-model.trim="newBreak.text">
            </div>
            <div class="form_group">
                <label for="link">URL (optional)</label>&nbsp;
                <input type="link" id="link" v-model.trim="newBreak.link">
            </div>
            <div class="form_group">
                <label for="category">Category</label>&nbsp;
                <select name="category" id="category" v-model="newBreak.category">
                    <option>misc</option>
                </select>
            </div>
            <div class="form_group">
                <input type="checkbox" id="short" name="short" value="short" v-model="newBreak.short"> <label for="short">{{ newBreak.short ? "Short Break" : "Long Break" }}</label><br>
                <input type="checkbox" id="mobile" name="mobile" value="mobile" v-model="newBreak.mobile"> <label for="mobile">{{ newBreak.mobile ? "Mobile Break" : "Home Break" }}</label><br>
                <input type="checkbox" id="lazy" name="lazy" value="lazy" v-model="newBreak.lazy"> <label for="lazy">{{ newBreak.lazy ? "Lazy Break" : "Active Break" }}</label><br>
                <input type="checkbox" id="stand" name="stand" value="stand" v-model="newBreak.stand"> <label for="stand">{{ newBreak.stand ? "Standing Break" : "Sitting Break" }}</label><br>
            </div>
            <div class="form_group">
                <button @click.prevent="add" class="green">Add</button>
            </div>
        </form>
    </section>
</template>