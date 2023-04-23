<template>
    <h2>Close tabs and programs first. How much time do you have to spare?</h2>
    <div class="time-selection">
        <button><RouterLink to="/breaktime?mode=small">Not Much ⏳</RouterLink></button>
        <button><RouterLink to="/breaktime?mode=lazy">I'm Lazy 😪</RouterLink></button>
        <button><RouterLink to="/breaktime">Plentiful ⏳⏳⏳</RouterLink></button>
    </div>
</template>
<style>
.time-selection button {
    margin-right: 1rem;
}
</style>