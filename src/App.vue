<template>
    <section class="row justify-content-center my-20">
        <div class="col-12 col-lg-6 p-10">
            <SearchBox @search="onSearch"/>
            <transition name="fade" mode="out-in">
                <div v-if="profile != null">
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
                // profile: null
                profile: {"uuid":"ba4161c03a42496c8ae07d13372f3371","username":"james090500","history":[{"name":"james090500"},{"name":"TheSexySlime","changedToAt":1423064662000},{"name":"james090500","changedToAt":1425728631000}],"textures":{"SKIN":{"url":"http://textures.minecraft.net/texture/70161d051a06a42987f29f8aeffee510a40c11bd8033b726d6812abe98a3604a"},"CAPE":{"url":"http://textures.minecraft.net/texture/2340c0e03dd24a11b15a8b33c2a7e9e32abb2051b2481d0ba7defd635ca7a933"}}}
            }
        },
        methods: {
            onSearch(value) {
                this.getPlayer(value);
            },
            getPlayer(value) {
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