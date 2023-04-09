<script>
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";
</script>

<main>
    <Header/>
    
        <slot class="slot"></slot>
    
    <!-- <Footer/> -->
</main>
