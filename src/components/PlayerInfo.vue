<template>
    <section>
        <div class="panel bg-dark table-responsive mb-10">
            <div class="panel-title">Profile</div>
            <table class="table border-top">
                <tr>
                    <th>Username</th>
                    <td>{{this.profile.username}}</td>
                </tr>
                <tr>
                    <th>UUID</th>
                    <td>{{this.profile.uuid}}</td>
                </tr>
            </table>
        </div>
        <div class="panel bg-dark table-responsive mb-10">
            <div class="panel-title">History</div>
            <table class="table border-top">
                <tr v-for="(user, index) in this.usernameHistory" :key="index">
                    <th>{{this.usernameHistory.length - index}}</th>
                    <td>{{user.name}}</td>
                    <td v-if="user.changedToAt">changed {{usernameChangedAt(user.changedToAt)}}</td>
                </tr>
            </table>
        </div>
    </section>
</template>

<style>
    .panel-title {
        margin: 0;
        padding: 0.4rem 1.5rem;
        font-weight: 700;
        font-size: medium;
    }
</style>

<script>
    import { formatDistance } from 'date-fns'

    export default {
        methods: {
            usernameChangedAt(value) {
                return formatDistance(new Date(value), new Date(), { addSuffix: true })
            }
        },
        computed: {
            usernameHistory() {
                return this.profile.history.slice().reverse();
            },
        },
        props: {
            profile: Object
        }
    }
</script>