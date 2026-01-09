<script>
    let { children } = $props();

    let currentPage = $state(0);
    let totalPages = $state(0);

    // References to DOM elements
    let viewport = $state();
    let track = $state();

    // The calculated pixel value to move the track
    let translateX = $state(0);

    // 1. Update total pages when children render
    $effect(() => {
        if (track) {
            // Count standard HTML elements inside the track
            totalPages = track.children.length;
        }
    });

    // 2. Calculate centering offset whenever page or dimensions change
    $effect(() => {
        updatePosition();
    });

    function updatePosition(){
        // Dependencies: run this when currentPage, viewport, or track changes
        if (viewport && track && track.children[currentPage]) {
            const activeChild = track.children[currentPage];

            // Get dimensions
            const viewportWidth = viewport.offsetWidth;
            const childLeft = activeChild.offsetLeft;
            const childWidth = activeChild.offsetWidth;

            // Math: Center of Viewport - Center of Child
            const centerPosition =
                viewportWidth / 2 - (childLeft + childWidth / 2);

            translateX = centerPosition;
        }
    }

    function nextPage() {
        if (currentPage < totalPages - 1) currentPage++;
    }

    function prevPage() {
        if (currentPage > 0) currentPage--;
    }

    function goToPage(index) {
        currentPage = index;
    }

    function handleTrackClick(event) {
        // 1. Find the direct child of 'track' that was clicked
        // We use .closest() in case the user clicked an image/text INSIDE the child
        const clickedChild = event.target.closest('.track > *');

        if (clickedChild && track) {
            // 2. Find the index of that child
            const childrenArray = Array.from(track.children);
            const index = childrenArray.indexOf(clickedChild);

            // 3. Update the page if valid
            if (index !== -1) {
                goToPage(index);
            }
        }
    }
</script>

<svelte:window onresize={updatePosition} />

<div class="main">
    <div class="indicators">
        {#each Array(totalPages) as _, i}
            <button
                title="Go to page {i + 1}"
                class="dot"
                class:active={i === currentPage}
                onclick={() => goToPage(i)}
            ></button>
        {/each}
    </div>

    <button
        class="nav-btn left"
        onclick={prevPage}
        disabled={currentPage === 0}
    >
        &lt;
    </button>

    <div class="content" bind:this={viewport}>
        <div
            class="track"
            bind:this={track}
            style="transform: translateX({translateX}px)"
            onclick={handleTrackClick}
        >
            {@render children()}
        </div>
    </div>

    <button
        class="nav-btn right"
        onclick={nextPage}
        disabled={currentPage === totalPages - 1}
    >
        &gt;
    </button>
</div>

<style>
    .main {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        padding-top: 60px;
        overflow: hidden; /* Ensures buttons stick to sides if parent is small */
        transition: all 0.3s ease-out;
    }

    /* 1. The Mask */
    .content {
        flex: 1; /* Fill remaining space between buttons */
        overflow: hidden; /* Hide elements that are too far off-screen */
        position: relative;
        padding: 15px;
        /* Optional: Add a mask fade effect on sides */
        /* mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); */
    }

    /* 2. The Track */
    .track {
        display: flex; /* Arrange children in a row */
        width: max-content; /* Allow track to be as wide as all children combined */
        gap: 20px; /* Space between items */
        transition: transform 0.4s ease-in-out; /*cubic-bezier(0.25, 1, 0.5, 1);  Smooth Slide */
        will-change: transform;

        /* Ensure the first item starts somewhat centrally if needed */
        padding: 0 50px;
    }

    /* 3. The Children */
    /* Use :global because children are passed in */
    .track > :global(*) {
        flex-shrink: 0; /* CRITICAL: Prevent items from squishing */
        /* Note: We do NOT set width here, effectively keeping your original width */
        cursor: pointer;
    }

    

    /* Button Styles (Simplified for brevity) */
    .nav-btn {
        z-index: 2;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        padding: 1rem;
        cursor: pointer;
    }
    .indicators {
        position: absolute;
        top: 25px; /* Adjusted to bottom for standard layout */
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 25px;
        z-index: 10;
    }
    .dot {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #ccc;
        opacity: 0.1;
        border: none;
        transition: all 0.3s ease-out;
    }
    .dot.active {
        opacity: 0.9;
        transform: scale(1.5);
    }
</style>
