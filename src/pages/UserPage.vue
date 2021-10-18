<template>
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
</template>

<script>
    import PlayerModel from '../components/PlayerModel'
    import PlayerInfo from '../components/PlayerInfo'

    export default {
        data() {
            return {
                loading: false,
                profile: null
            }
        },
        created() {
            this.getPlayer(this.$route.params.user)
        },
        methods: {
            getPlayer(value) {
                this.profile = null;
                this.loading = true;
                this.axios.get(`https://mcinfo-api.james090500.workers.dev/v1/user/${value}`).then((response) => {
                    this.profile = response.data;
                    this.$router.push(`/${this.profile.uuid}`)
                }).finally(() => {
                    this.loading = false;
                });
            }
        },
        components: {
            PlayerModel,
            PlayerInfo
        }
    }
</script>