<template>
    <section>
        <img src="@/assets/Infinity-1s-200px.svg" alt="">
    </section>
</template>
<script>
export default{
    name: 'LoadingComponent',
}
</script>
<style lang="scss" scoped>
    section{
        z-index: 100000000;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #f1f2f3;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>