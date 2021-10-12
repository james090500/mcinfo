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
                <tr v-for="(user, index) in this.profile.history" :key="index">
                    <th>{{this.profile.history.length - index}}</th>
                    <td>{{user.name}}</td>
                    <td v-if="user.changedToAt">{{$filters.formatDate(user.changedToAt)}}</td>
                    <td v-else>Current Username</td>
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
    export default {
        props: {
            profile: Object
        }
    }
</script>