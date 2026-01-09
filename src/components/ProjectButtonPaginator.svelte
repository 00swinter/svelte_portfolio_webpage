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
        // Dependencies: run this when currentPage, viewport, or track changes
        if (viewport && track && track.children[currentPage]) {
            const activeChild = track.children[currentPage];
            
            // Get dimensions
            const viewportWidth = viewport.offsetWidth;
            const childLeft = activeChild.offsetLeft;
            const childWidth = activeChild.offsetWidth;

            // Math: Center of Viewport - Center of Child
            const centerPosition = (viewportWidth / 2) - (childLeft + childWidth / 2);
            
            translateX = centerPosition;
        }
    });

    function nextPage() {
        if (currentPage < totalPages - 1) currentPage++;
    }

    function prevPage() {
        if (currentPage > 0) currentPage--;
    }
    
    function goToPage(index) {
        currentPage = index;
    }
</script>

<div class="main">
    <div class="indicators">
        {#each Array(totalPages) as _, i}
            <button 
                class="dot" 
                class:active={i === currentPage} 
                onclick={() => goToPage(i)}
            ></button>
        {/each}
    </div>

    <button class="nav-btn left" onclick={prevPage} disabled={currentPage === 0}>
        &lt;
    </button>

    <div class="content" bind:this={viewport}>
        <div 
            class="track" 
            bind:this={track}
            style="transform: translateX({translateX}px)"
        >
            {@render children()}
        </div>
    </div>

    <button class="nav-btn right" onclick={nextPage} disabled={currentPage === totalPages - 1}>
        &gt;
    </button>
</div>

<style>
    .main {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        overflow: hidden; /* Ensures buttons stick to sides if parent is small */
    }

    /* 1. The Mask */
    .content {
        flex: 1;             /* Fill remaining space between buttons */
        overflow: hidden;    /* Hide elements that are too far off-screen */
        position: relative;
        /* Optional: Add a mask fade effect on sides */
        /* mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); */
    }

    /* 2. The Track */
    .track {
        display: flex;       /* Arrange children in a row */
        width: max-content;  /* Allow track to be as wide as all children combined */
        gap: 20px;           /* Space between items */
        transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1); /* Smooth Slide */
        will-change: transform;
        
        /* Ensure the first item starts somewhat centrally if needed */
        padding: 0 50px; 
    }

    /* 3. The Children */
    /* Use :global because children are passed in */
    .track > :global(*) {
        flex-shrink: 0;      /* CRITICAL: Prevent items from squishing */
        /* Note: We do NOT set width here, effectively keeping your original width */
    }

    /* Button Styles (Simplified for brevity) */
    .nav-btn {
        z-index: 2;
        background: rgba(0,0,0,0.5);
        color: white;
        border: none;
        padding: 1rem;
        cursor: pointer;
    }
    .indicators {
        position: absolute;
        bottom: 20px; /* Adjusted to bottom for standard layout */
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
        z-index: 10;
    }
    .dot {
        width: 10px; height: 10px; border-radius: 50%; background: #ccc; border:none;
    }
    .dot.active { background: #fff; transform: scale(1.2); }
</style>