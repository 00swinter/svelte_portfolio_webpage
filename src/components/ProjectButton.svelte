<script>
    let { src, title } = $props();
</script>

<div class="projectButton">
    <div class="gradient"></div>
    <div class="title">
        {title}
    </div>
    <img {src} alt="{title} project thumbnail" class="background" />
</div>

<style>
    .projectButton {
        position: relative; /* CRITICAL: Anchors the absolute children */
        display: flex;
        flex: 0 0 auto; /* This ensures the button stays exactly 300px wide */
        scroll-snap-align: center; /* This makes the card "lock" into place */
        justify-content: center;
        align-items: center;
        width: 500px;
        height: 300px;      /* Or whatever height you want */
        overflow: hidden;   /* Keeps the image inside the borders */
        border-radius: 50px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s ease-out;
    }
    .background {
        position: absolute;
        inset: 0;           /* Shortcut for top/bottom/left/right: 0 */
        width: 100%;
        height: 100%;
        object-fit: cover;  /* Ensures image doesn't stretch weirdly */
        z-index: 1;
    }

    .gradient {
        position: absolute;
        inset: 0;           /* This fills the parent completely */
        background: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.32) 63%, rgba(0, 0, 0, 0) 100%);
        z-index: 2;         /* Sits on top of the image */
        opacity: 1;
        transition: all 0.3s ease-out;
    }

    .title{
        position: relative;
        margin-top: 0px;
        z-index: 3;
        color: rgb(72, 111, 182);
        font-size: 35px;
        font-weight: bold;
        background-color: white;
        border-radius: 15px;
        padding: 10px;
        padding-top: 6px;
        transition: all 0.3s ease-out;
    }
    .projectButton:hover .title {
        margin-top: 150px;
    }
    .projectButton:hover .gradient {
        opacity: 0.6;
    }
    .projectButton:hover{
        transform: translateY(-10px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }
</style>