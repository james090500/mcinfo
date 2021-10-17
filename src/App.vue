<template>
    <section class="row justify-content-center my-20">
        <div class="col-12 col-lg-6 p-10">
            <SearchBox @search="onSearch"/>
            <transition name="fade" mode="out-in">
                <div v-if="profile != null && !loading">
                    <h1 class="border-bottom m-0 pb-10">{{profile.username}}</h1>
                    <div class="row mt-10">
                        <div class="col-12 col-lg-4 mb-10">
                            <PlayerModel :profile="profile"/>
                        </div>
                        <div class="col-12 col-lg-8 pl-lg-10">
                            <PlayerInfo :profile="profile"/>
                        </div>
                    </div>
                </div>
                <div class="text-center" v-else-if="loading">
                    <h1><fa icon="cog" spin/> Loading...</h1>
                </div>
            </transition>
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
    import PlayerModel from './components/PlayerModel'
    import PlayerInfo from './components/PlayerInfo'

    export default {
        data() {
            return {
                loading: false,
                profile: null
            }
        },
        methods: {
            onSearch(value) {
                this.getPlayer(value);
            },
            getPlayer(value) {
                this.profile = null;
                this.loading = true;
                this.axios.get(`https://mcinfo-api.james090500.workers.dev/v1/user/${value}`).then((response) => {
                    this.profile = response.data;
                }).finally(() => {
                    this.loading = false;
                });
            }
        },
        components: {
            SearchBox,
            PlayerModel,
            PlayerInfo
        }
    }
</script>