<template>
    <div v-if="errors.length > 0" class="alert alert-danger">
        <ul class="mb-0">
            <li v-for="(error, index) in errors" v-bind:key="index">{{ error }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Errors",
    computed: {
        errors() {
            return this.$store.state.errors;
        }
    }
}
</script>
