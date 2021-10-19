<template>
    <section class="row justify-content-center my-20">
        <div class="col-12 col-lg-6 p-10">
            <SearchBox @search="onSearch"/>
            <router-view v-slot="{ Component }">
                <transition ame="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </section>
</template>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .25s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>

<script>
    import SearchBox from './components/SearchBox'

    export default {
        methods: {
            onSearch(value) {
                this.$router.push(`/${value}`)
            }
        },
        components: {
            SearchBox
        }
    }
</script>
