<script>
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";
    import { onMount } from "svelte";

    onMount(() => {
        if (location.pathname.startsWith("/react")) {
            location.href = "http://localhost:3000/react";
        }
    });
</script>

<main>
    <Header />

    <slot class="slot" />

    <!-- <Footer/> -->
</main>
