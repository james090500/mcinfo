<template>
    <div id="skin_container" class="bg-very-dark" v-if="!errors">
        <button id="toggleElytra" class="btn btn-link" v-on:click="toggleElytra" v-if="profile.textures.CAPE"><fa :icon="buttonClass"/> Elytra</button>
        <canvas id="skin_canvas" class="w-full"></canvas>
    </div>
    <div class="alert alert-danger mr-10" v-else>
        Your browser doesn't support WebGL. You will experience issues!
    </div>
</template>

<style>
    #skin_container {
        text-align: center;
        cursor: move;
    }

    #skin_container.canvas {
        filter: drop-shadow(-5px 5px 7px rgba(0, 0, 0, 0.4));
        outline: none;
        position: relative;
        width: 100%;
    }

    #toggleElytra {
        position: absolute;
        right: 0;
        z-index: 10;
    }
</style>

<script>
    const skinview3d = require('@james090500/skinview3d')

    export default {
        data() {
            return {
                elementId: null,
                skinViewer: null,
                buttonClass: 'toggle-off',
                errors: false,
            }
        },
        mounted() {
            try {
                this.createObject();
            } catch(error) {
                this.errors = true
            }
        },
        unmounted() {
            this.skinViewer.dispose();
        },
        methods: {
            createObject() {
                this.skinViewer = new skinview3d.SkinViewer({
                    canvas: document.getElementById("skin_canvas"),
                    width: 300,
                    height: 400,
                    skin: `https://mcinfo-api.james090500.workers.dev/v1/user/${this.profile.uuid}/skin`,
                    cape: `https://mcinfo-api.james090500.workers.dev/v1/user/${this.profile.uuid}/cape`
                });

                // Control objects with your mouse!
                let control = skinview3d.createOrbitControls(this.skinViewer);
                control.enableRotate = true;
                control.enableZoom = false;
                control.enablePan = false;
            },
            toggleElytra() {
                if(this.skinViewer.capeImage != null)
                    if(this.skinViewer.playerObject.backEquipment == "cape") {
                        this.buttonClass = "toggle-on"
                        this.skinViewer.loadCape(this.skinViewer.capeImage.currentSrc, { backEquipment: "elytra" })
                    } else {
                        this.buttonClass = "toggle-off"
                        this.skinViewer.loadCape(this.skinViewer.capeImage.currentSrc)
                    }
            }
        },
        props: {
            profile: Object
        }
    }
</script>