<script setup>
    import useBreaks from '../../composables/useBreaks';
    import { ref, onMounted } from 'vue';
    const { getBreaksAdmin, allBreaks, disableBreak } = useBreaks();
    const showMenu = ref(true);

    onMounted(getBreaksAdmin);
</script>
<template>
    <section class="admin_section">
        <header class="admin_section_header">
            <h3>List of Breaks</h3>
            <small class="toggleBtn" @click="showMenu = !showMenu">{{ showMenu ? "Hide List" : "Show List" }}</small>
        </header>
        <table v-show="showMenu">
            <thead>
                <tr>
                    <th>Break Message</th>
                    <th>Disable/Enable</th>
                </tr>
            </thead>
            <tbody v-for="aBreak in allBreaks" :key="aBreak.id">
                <td><span :class="{ disabled: !aBreak.enabled }">{{ aBreak.text }}</span></td>
                <td>
                    <button @click="disableBreak(aBreak.id)" type="button" class="btn_remove">&times;</button>
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