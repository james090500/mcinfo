<template>
    <form class="form-inline" v-on:submit.prevent="doSearch">
        <input type="text" class="form-control" v-model="search" placeholder="Username or UUID"/>
        <button class="btn btn-primary" type="button" @click="doSearch"><fa icon="search"/></button>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                search: null
            }
        },
        methods: {
            doSearch() {
                this.$emit('search', this.search)
            }
        }
    }
</script>