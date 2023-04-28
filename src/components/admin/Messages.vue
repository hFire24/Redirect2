<script setup>
    import useMessages from '../../composables/useMessages';
    import { ref, onMounted } from 'vue';
    const { getMessagesAdmin, allMessages, disableMessage } = useMessages();
    const showMenu = ref(true);

    onMounted(getMessagesAdmin);
</script>
<template>
    <section class="admin_section">
        <header class="admin_section_header">
            <h3>List of Messages</h3>
            <small class="toggleBtn" @click="showMenu = !showMenu">{{ showMenu ? "Hide List" : "Show List" }}</small>
        </header>
        <table v-show="showMenu">
            <thead>
                <tr>
                    <th>Message</th>
                    <th>Disable/Enable</th>
                </tr>
            </thead>
            <tbody v-for="aMessage in allMessages" :key="aMessage.id">
                <td><span :class="{ disabled: !aMessage.enabled }">{{ aMessage.text }}</span></td>
                <td>
                    <button @click="disableMessage(aMessage.id)" type="button" class="btn_remove">&times;</button>
                </td>
            </tbody>
        </table>
    </section>
</template>
<style>
    .disabled {
        text-decoration: line-through;
    }
</style>