<script>
    import {
        Button,
        Table,
        Modal,
        ModalBody,
        ModalFooter,
        ModalHeader,
        Container,
        Label,
        Input,
        Form,
        FormGroup,
        Card,
        CardTitle,
        Alert,
    } from "sveltestrap";
</script>

<svelte:head>
    <title>Vídeos</title>
</svelte:head>

<Container>
    <h1 class="m-3">Vídeos</h1>
    <div class="m-4">
        <h2 class="my-3">Vídeo de Ignacio García Rodríguez</h2>
        <div class="m-2">
            <iframe
            title="SOS2223-11 Ignacio García Rdríguez"
                width="1080"
                height="720"
                src="https://www.youtube.com/embed/VMMUDoD4tF8"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        </div>
        <Button href="https://drive.google.com/file/d/14ocLB89IGhqF4W-UNDTQPMhLQB1Mm5zg/view?usp=share_link">Vídeo en Google Drive</Button>
    </div>
    <div class="m-4">
        <h2 class="my-3">Vídeo de Victor Ruiz Jiménez</h2>
        <Button href="https://youtu.be/1OwHQBw9ZZY">Vídeo</Button>
    </div>
    <div class="m-4">
        <h2 class="my-3">Vídeo de Christian Asuero Carrellán</h2>
        <Button href="/">Vídeo</Button>
    </div>
</Container>
